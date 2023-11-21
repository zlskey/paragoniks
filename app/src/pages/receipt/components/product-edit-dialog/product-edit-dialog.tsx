import * as yup from 'yup'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import ConfirmIcon from '@mui/icons-material/CheckOutlined'
import { LoadingButton } from '@mui/lab'
import { ProductEditDialogProps } from './product-edit-dialog.types'
import RemoveIcon from '@mui/icons-material/DeleteForeverOutlined'
import { Trans } from '@lingui/macro'
import { updateProduct } from 'src/helpers/services/endpoints/receipt/receipt.service'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  name: '',
  price: 0,
  count: 0,
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(30, 'Product name must be at most 30 characters'),

  price: yup
    .number()
    .required('Product price is required')
    .min(0.01, 'Product price must be at least 0.01')
    .max(100000, 'Product price must be at most 100000'),

  count: yup
    .number()
    .required('Product count is required')
    .max(100000, 'Product count must be at most 100000'),
})

const ProductEditDialog = ({ product, onClose }: ProductEditDialogProps) => {
  const formState = useForm({ defaultValues, resolver: yupResolver(schema) })

  const { receipt } = useReceiptContext()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['receipt'],
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['receipt', { receiptId: receipt._id }],
      })
    },
  })

  useEffect(() => {
    if (product) {
      const { name, price, count } = product

      formState.reset({
        name,
        price,
        count,
      })
    }
  }, [product])

  const handleSubmit = (data: typeof defaultValues) => {
    if (!product) return

    mutate({
      receiptId: receipt._id,
      productId: product._id,
      product: data,
    })
  }

  const getErrorMessage = (field: keyof typeof defaultValues) => {
    return formState.formState.errors[field]?.message || ''
  }

  return (
    <Dialog onClose={onClose} open={Boolean(product)}>
      <form onSubmit={formState.handleSubmit(handleSubmit)}>
        <DialogTitle>
          <Trans>Edit</Trans>
        </DialogTitle>

        <DialogContent>
          <Grid container p={1} spacing={1}>
            <Grid item xs={12}>
              <TextField
                label={<Trans>Name</Trans>}
                placeholder='Aa...'
                fullWidth
                error={Boolean(getErrorMessage('name'))}
                helperText={getErrorMessage('name')}
                disabled={isPending}
                {...formState.register('name')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label={<Trans>Price</Trans>}
                type='number'
                placeholder='10'
                fullWidth
                inputProps={{ step: 0.01 }}
                error={Boolean(getErrorMessage('price'))}
                helperText={getErrorMessage('price')}
                disabled={isPending}
                {...formState.register('price')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label={<Trans>Count</Trans>}
                type='number'
                placeholder='2'
                fullWidth
                inputProps={{ step: 0.01 }}
                error={Boolean(getErrorMessage('count'))}
                helperText={getErrorMessage('count')}
                disabled={isPending}
                {...formState.register('count')}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Stack direction='row' spacing={1}>
            <LoadingButton
              startIcon={<ConfirmIcon />}
              variant='contained'
              size='medium'
              sx={{ flexGrow: 1 }}
              color='success'
              type='submit'
              loading={isPending}
            >
              <Trans>Confirm</Trans>
            </LoadingButton>

            <Button
              startIcon={<RemoveIcon />}
              size='medium'
              sx={{ flexGrow: 1 }}
              color='error'
              onClick={onClose}
              disabled={isPending}
            >
              <Trans>Cancel</Trans>
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProductEditDialog

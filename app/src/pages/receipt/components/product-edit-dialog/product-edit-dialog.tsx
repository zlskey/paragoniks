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
  Typography,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import ConfirmIcon from '@mui/icons-material/CheckOutlined'
import { LoadingButton } from '@mui/lab'
import { Product } from 'src/types/generic.types'
import { ProductEditDialogProps } from './product-edit-dialog.types'
import RemoveIcon from '@mui/icons-material/DeleteForeverOutlined'
import { Trans } from '@lingui/macro'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { updateProduct } from 'src/helpers/api/endpoints/receipt/receipt.api'
import { useForm } from 'react-hook-form'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import useToggleComprising from '../product-item/use-toggle-comprising'
import { yupResolver } from '@hookform/resolvers/yup'

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

type DefaultValues = Pick<Product, 'name' | 'price' | 'count'>

const ProductEditDialog = ({ productId, onClose }: ProductEditDialogProps) => {
  const { receipt, contributors } = useReceiptContext()

  const product = receipt.products.find(product => product._id === productId)

  if (!product) return null

  const formState = useForm({
    defaultValues: product,
    resolver: yupResolver(schema),
  })

  const handleToggleComprising = useToggleComprising({ productId: product._id })

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

  const handleSubmit = (data: DefaultValues) => {
    mutate({
      receiptId: receipt._id,
      productId: product._id,
      product: data,
    })
  }

  const onAvatarClick = (userId: string) => () => {
    handleToggleComprising({ userId })
  }

  const getErrorMessage = (field: keyof DefaultValues) => {
    return formState.formState.errors[field]?.message || ''
  }

  return (
    <Dialog onClose={onClose} open={Boolean(product)}>
      <form onSubmit={formState.handleSubmit(handleSubmit)}>
        <DialogTitle>
          <Trans>Edit</Trans>
        </DialogTitle>

        <DialogContent>
          <Grid container p={1} spacing={1} rowSpacing={2}>
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

            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography variant='subtitle1'>
                  <Trans>Friends that comprise</Trans>
                </Typography>

                <Stack direction='row' spacing={2}>
                  {contributors.map(contributor => (
                    <UserAvatar
                      profile={contributor}
                      selected={!!product?.comprising.includes(contributor._id)}
                      onClick={onAvatarClick(contributor._id)}
                    />
                  ))}
                </Stack>
              </Stack>
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

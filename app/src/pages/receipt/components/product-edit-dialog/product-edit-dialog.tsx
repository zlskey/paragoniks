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

import ConfirmIcon from '@mui/icons-material/CheckOutlined'
import { LoadingButton } from '@mui/lab'
import { ProductEditDialogProps } from './product-edit-dialog.types'
import RemoveIcon from '@mui/icons-material/DeleteForeverOutlined'
import { updateReceiptProduct } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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

const ProductEditDialog = ({
  product,
  onClose,
  receiptId,
}: ProductEditDialogProps) => {
  const formState = useForm({ defaultValues, resolver: yupResolver(schema) })

  const dispatch = useAppDispatch()

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

    dispatch(
      updateReceiptProduct({ receiptId, productId: product._id, product: data })
    )
    onClose()
  }

  const getErrorMessage = (field: keyof typeof defaultValues) => {
    return formState.formState.errors[field]?.message || ''
  }

  return (
    <Dialog onClose={onClose} open={Boolean(product)}>
      <form onSubmit={formState.handleSubmit(handleSubmit)}>
        <DialogTitle>Edit</DialogTitle>

        <DialogContent>
          <Grid container p={1} spacing={1}>
            <Grid item xs={12}>
              <TextField
                label='Name'
                placeholder='Some name'
                fullWidth
                error={Boolean(getErrorMessage('name'))}
                helperText={getErrorMessage('name')}
                {...formState.register('name')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label='Price'
                type='number'
                placeholder='10'
                fullWidth
                inputProps={{ step: 0.01 }}
                error={Boolean(getErrorMessage('price'))}
                helperText={getErrorMessage('price')}
                {...formState.register('price')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label='Count'
                type='number'
                placeholder='2'
                fullWidth
                inputProps={{ step: 0.01 }}
                error={Boolean(getErrorMessage('count'))}
                helperText={getErrorMessage('count')}
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
            >
              Confirm
            </LoadingButton>

            <Button
              startIcon={<RemoveIcon />}
              size='medium'
              sx={{ flexGrow: 1 }}
              color='error'
              onClick={onClose}
            >
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProductEditDialog

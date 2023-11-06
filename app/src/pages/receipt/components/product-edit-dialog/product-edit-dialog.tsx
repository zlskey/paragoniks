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

const defaultValues = {
  name: '',
  price: 0,
  count: 0,
}

const ProductEditDialog = ({
  product,
  onClose,
  receiptId,
}: ProductEditDialogProps) => {
  const formState = useForm({ defaultValues })

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

  return (
    <Dialog onClose={onClose} open={Boolean(product)}>
      <DialogTitle>Edit</DialogTitle>

      <DialogContent>
        <Grid container p={1} spacing={1}>
          <Grid item xs={12}>
            <TextField
              label='name'
              placeholder='Some name'
              fullWidth
              {...formState.register('name')}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label='Price'
              type='number'
              placeholder='10'
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
              {...formState.register('price')}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label='Count'
              type='number'
              placeholder='2'
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
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
            onClick={formState.handleSubmit(handleSubmit)}
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
    </Dialog>
  )
}

export default ProductEditDialog

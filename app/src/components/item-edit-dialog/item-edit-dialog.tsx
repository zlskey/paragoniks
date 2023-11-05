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
import { Item } from 'src/types/generic.types'
import { LoadingButton } from '@mui/lab'
import RemoveIcon from '@mui/icons-material/DeleteForeverOutlined'
import { updateReceiptItem } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface FormState {
  name: string
  value: number
  count: number
}

interface ItemEditDialogProps {
  item: Item | null
  onClose: () => void
  receiptId: string
}

const defaultValues: FormState = {
  name: '',
  value: 0,
  count: 0,
}

const ItemEditDialog = ({ item, onClose, receiptId }: ItemEditDialogProps) => {
  const formState = useForm({ defaultValues })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (item) {
      const { name, value, count } = item

      formState.reset({
        name,
        value,
        count,
      })
    }
  }, [item])

  const handleSubmit = (data: FormState) => {
    if (!item) return

    dispatch(updateReceiptItem({ receiptId, itemId: item._id, item: data }))
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={Boolean(item)}>
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
              {...formState.register('value')}
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

export default ItemEditDialog

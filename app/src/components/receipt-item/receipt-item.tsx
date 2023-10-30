import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { Receipt } from 'src/types/generic.types'
import { removeReceipt } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useNavigate } from 'react-router-dom'

const ReceiptItem = ({ receipt }: { receipt: Receipt }) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const navigateToReceipt = (id: string) => () => {
    navigate(`/receipt/${id}`)
  }

  const handleRemoveReceipt = (receiptId: string) => () => {
    dispatch(removeReceipt(receiptId))
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={handleRemoveReceipt(receipt._id)}>
          <DeleteIcon />
        </IconButton>
      }
      key={receipt._id}
    >
      <ListItemButton onClick={navigateToReceipt(receipt._id)}>
        <ListItemText>{receipt.title}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default ReceiptItem

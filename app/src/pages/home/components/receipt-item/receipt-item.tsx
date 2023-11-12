import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { ReceiptItemProps } from './receipt-item.types'
import { removeReceipt } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useNavigate } from 'react-router-dom'

const ReceiptItem = ({ receipt }: ReceiptItemProps) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { _id: receiptId, title } = receipt

  const navigateToReceipt = () => {
    navigate(`/receipt/${receiptId}`)
  }

  const handleRemoveReceipt = () => {
    dispatch(removeReceipt({ receiptId }))
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={handleRemoveReceipt}>
          <DeleteIcon />
        </IconButton>
      }
      key={receiptId}
    >
      <ListItemButton onClick={navigateToReceipt}>
        <ListItemText>{title}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default ReceiptItem

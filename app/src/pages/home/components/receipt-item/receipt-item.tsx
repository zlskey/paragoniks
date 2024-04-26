import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { ReceiptItemProps } from './receipt-item.types'
import { useNavigate } from 'react-router-dom'
import useRemoveReceipt from './use-remove-receipt'

const ReceiptItem = ({ receipt }: ReceiptItemProps) => {
  const navigate = useNavigate()

  const { _id: receiptId, title } = receipt

  const navigateToReceipt = () => {
    navigate(`/receipt/${receiptId}`)
  }

  const handleRemoveReceipt = useRemoveReceipt({ receiptId })

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={() => handleRemoveReceipt()}>
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

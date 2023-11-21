import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { Receipt } from 'src/types/generic.types'
import { ReceiptItemProps } from './receipt-item.types'
import { removeReceipt } from 'src/helpers/services/endpoints/receipt/receipt.service'
import { useNavigate } from 'react-router-dom'

const ReceiptItem = ({ receipt }: ReceiptItemProps) => {
  const navigate = useNavigate()

  const { _id: receiptId, title } = receipt

  const navigateToReceipt = () => {
    navigate(`/receipt/${receiptId}`)
  }

  const queryClient = useQueryClient()

  const { mutate: handleRemoveReceipt } = useMutation({
    mutationKey: ['receipt', { receiptId }],
    mutationFn: removeReceipt,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['receipt'] })

      const previousReceipts = queryClient.getQueryData([
        'receipt',
      ]) as Receipt[]

      queryClient.setQueryData(
        ['receipt'],
        previousReceipts.filter(receipt => receipt._id !== receiptId)
      )

      return { previousReceipts }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['receipt'] })
    },
    onError: (_1, _2, context: any) => {
      queryClient.setQueryData(
        ['receipt'],
        context?.previousReceipts as Receipt[]
      )
    },
  })

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={() => handleRemoveReceipt({ receiptId })}>
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

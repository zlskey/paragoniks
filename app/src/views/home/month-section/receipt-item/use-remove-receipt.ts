import { Receipt, ReceiptId } from 'src/app/generic.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeReceipt } from 'src/api/endpoints/receipt/receipt.api'

interface UseRemoveReceiptProps {
  receiptId: ReceiptId
}

function useRemoveReceipt({ receiptId }: UseRemoveReceiptProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['receipt', { receiptId }],
    mutationFn: () => removeReceipt({ receiptId }),
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
}

export default useRemoveReceipt

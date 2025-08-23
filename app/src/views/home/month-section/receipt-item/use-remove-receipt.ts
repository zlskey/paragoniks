import type { Receipt, ReceiptId } from '@types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeReceipt } from 'src/api/endpoints/receipt/receipt.api'

interface UseRemoveReceiptProps {
  receiptId: ReceiptId
  onSuccess?: () => void
  onError?: () => void
}

function useRemoveReceipt({ receiptId, onSuccess, onError }: UseRemoveReceiptProps) {
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
        previousReceipts.filter(receipt => receipt._id !== receiptId),
      )

      return { previousReceipts }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['receipt'] })
    },
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (_1, _2, context: any) => {
      queryClient.setQueryData(
        ['receipt'],
        context?.previousReceipts as Receipt[],
      )
      onError?.()
    },
  })
}

export default useRemoveReceipt

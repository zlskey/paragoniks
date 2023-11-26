import { Receipt, ReceiptId } from 'src/types/generic.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeReceipt } from 'src/helpers/api/endpoints/receipt/receipt.api'

const useRemoveReceipt = ({ receiptId }: { receiptId: ReceiptId }) => {
  const queryClient = useQueryClient()

  const { mutate: handleRemoveReceipt } = useMutation({
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

  return handleRemoveReceipt
}

export default useRemoveReceipt

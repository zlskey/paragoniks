import type { Receipt, ReceiptId } from 'src/app/generic.types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeReceipt } from 'src/api/endpoints/receipt/receipt.api'

interface UseRemoveReceiptProps {
  receiptId: ReceiptId
}

function useRemoveReceipt({ receiptId }: UseRemoveReceiptProps) {
  const queryClient = useQueryClient()
  const addNotification = useNotificationContext()

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
    onSuccess: () => addNotification('Paragon usunięty', 'success'),
    onError: (_1, _2, context: any) => {
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
      queryClient.setQueryData(
        ['receipt'],
        context?.previousReceipts as Receipt[],
      )
    },
  })
}

export default useRemoveReceipt

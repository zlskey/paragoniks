import type { Receipt } from 'src/app/generic.types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReceiptFromData } from 'src/api/endpoints/receipt/receipt.api'

function useCreateReceiptFromData() {
  const queryClient = useQueryClient()
  const addNotification = useNotificationContext()

  return useMutation({
    mutationKey: ['receipt'],
    mutationFn: createReceiptFromData,
    onError: () => {
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
    onSuccess: (data) => {
      if (!data) {
        return
      }

      queryClient.setQueryData(['receipt'], (oldReceipts: Receipt[]) => [
        ...oldReceipts,
        data,
      ])
      addNotification('Paragon dodany', 'success')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['receipt'] })
    },
  })
}

export default useCreateReceiptFromData

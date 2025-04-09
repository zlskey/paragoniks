import type { AxiosError } from 'axios'
import type { ImageBase64, Receipt } from 'src/app/generic.types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReceiptFromImage } from 'src/api/endpoints/receipt/receipt.api'

function useUploadReceipt() {
  const queryClient = useQueryClient()
  const addNotification = useNotificationContext()

  return useMutation({
    mutationKey: ['receipt'],
    mutationFn: async ({ image }: { image: ImageBase64 }) => {
      return createReceiptFromImage({ image })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.status === 429) {
        addNotification('Limit 2 paragonów na 6 godzin osiągniety', 'error')
        return
      }
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

export default useUploadReceipt

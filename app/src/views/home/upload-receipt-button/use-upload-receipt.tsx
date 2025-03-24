import type { AxiosError } from 'axios'
import type { ImageBase64, Receipt } from 'src/app/generic.types'

import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReceipt } from 'src/api/endpoints/receipt/receipt.api'

function useUploadReceipt() {
  const queryClient = useQueryClient()
  const addNotification = useNotificationContext()

  return useMutation({
    mutationKey: ['receipt'],
    mutationFn: async (image: ImageBase64) => {
      return createReceipt({ image })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.status === 429) {
        addNotification('Limit of 2 receipts per 6 hours reached', 'error')
      }
    },
    onSuccess: (data) => {
      if (!data) {
        return
      }

      queryClient.setQueryData(['receipt'], (oldReceipts: Receipt[]) => [
        ...oldReceipts,
        data,
      ])
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['receipt'] })
    },
  })
}

export default useUploadReceipt

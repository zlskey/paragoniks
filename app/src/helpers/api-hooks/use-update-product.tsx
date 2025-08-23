import type { Receipt } from '@types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct } from 'src/api/endpoints/receipt/receipt.api'

interface UseUpdateProductProps {
  receipt: Receipt
  onSuccess?: () => void
}

function useUpdateProduct({ receipt, onSuccess }: UseUpdateProductProps) {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()
  const queryKey = ['receipt', receipt._id]

  return useMutation({
    mutationKey: ['receipt'],
    mutationFn: updateProduct,
    onMutate: async ({ productId, product }) => {
      await queryClient.cancelQueries({ queryKey })

      const oldReceipt = queryClient.getQueryData<Receipt>(queryKey)

      queryClient.setQueryData(queryKey, (old: Receipt) => ({
        ...old,
        products: old.products.map(oldProduct =>
          oldProduct._id === productId
            ? { ...oldProduct, ...product }
            : oldProduct,
        ),
      }))

      return { oldReceipt }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['receipt', receipt._id],
      })
      onSuccess?.()
    },
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })
}

export default useUpdateProduct

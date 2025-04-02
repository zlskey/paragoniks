import type { ProductId } from '@app/generic.types'
import { removeProduct } from '@api/endpoints/receipt/receipt.api'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useReceiptContext } from '@views/receipt/receipt.context'

interface UseToggleComprisingProps {
  productId: ProductId
}

function useRemoveProduct({ productId }: UseToggleComprisingProps) {
  const addNotification = useNotificationContext()
  const { receipt } = useReceiptContext()
  const receiptId = receipt._id

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['receipt', receiptId, 'product', productId],
    mutationFn: () => {
      return removeProduct({ receiptId, productId })
    },
    onMutate: async () => {
      const updatedReceipt = {
        ...receipt,
        products: receipt.products.filter(product => product._id !== productId),
      }

      queryClient.setQueryData(['receipt', receipt._id], updatedReceipt)

      return { previousValue: receipt }
    },
    onError: (_1, _2, context) => {
      if (!context) {
        return
      }

      queryClient.setQueryData(['receipt', receipt._id], context.previousValue)
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['receipt', receipt._id],
      })
    },
  })

  return mutate
}

export default useRemoveProduct

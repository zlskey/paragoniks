import type { UserId } from 'src/app/generic.types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeContributor } from 'src/api/endpoints/receipt/receipt.api'
import { useReceiptContext } from 'src/views/receipt/receipt.context'

function useRemoveContributor({ contributorId }: { contributorId: UserId }) {
  const queryClient = useQueryClient()
  const { receipt: oldReceipt } = useReceiptContext()
  const addNotification = useNotificationContext()

  const receiptId = oldReceipt._id
  const mutationKey = ['receipt', receiptId]
  const queryKey = ['receipt', receiptId]

  const { mutate } = useMutation({
    mutationKey,
    mutationFn: removeContributor,
    onMutate: async ({ contributorId }: { contributorId: UserId }) => {
      await queryClient.cancelQueries({ queryKey })

      queryClient.setQueryData(queryKey, () => {
        const contributorsCopy = { ...oldReceipt.contributors }
        delete contributorsCopy[contributorId]
        return {
          ...oldReceipt,
          contributors: contributorsCopy,
          products: oldReceipt.products.map((product) => {
            delete product.division[contributorId]

            return product
          }),
        }
      })

      return { oldReceipt }
    },
    onError: (_1, _2, context) => {
      if (context?.oldReceipt) {
        queryClient.setQueryData(mutationKey, context.oldReceipt)
      }
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey })
      await queryClient.invalidateQueries({
        queryKey: ['receipt', receiptId, 'contributors'],
      })
    },
  })

  const handleRemoveContributor = () => {
    mutate({
      contributorId,
      receiptId,
    })
  }

  return handleRemoveContributor
}

export default useRemoveContributor

import type { Receipt, ReceiptId, UserId } from '@app/generic.types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addContributor } from 'src/api/endpoints/receipt/receipt.api'

function useAddContributor({ receiptId }: { receiptId: ReceiptId }) {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()

  const queryKey = ['receipt', receiptId]

  const { mutate } = useMutation({
    mutationKey: ['receipt', receiptId, 'friend'],
    mutationFn: addContributor,
    onMutate: async ({ contributorId }) => {
      await queryClient.cancelQueries({ queryKey })

      const oldReceipt = queryClient.getQueryData<Receipt>(queryKey)

      queryClient.setQueryData(queryKey, (old: Receipt) => ({
        ...old,
        contributors: {
          ...old.contributors,
          [contributorId]: 0,
        },
      }))

      return { oldReceipt }
    },
    onSuccess: (receipt) => {
      queryClient.setQueryData(queryKey, receipt)
      queryClient.invalidateQueries({
        queryKey: ['receipt', receiptId],
      })
    },
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })

  const handleAddContributor = (contributorId: UserId) => {
    mutate({
      receiptId,
      contributorId,
    })
  }

  return handleAddContributor
}

export default useAddContributor

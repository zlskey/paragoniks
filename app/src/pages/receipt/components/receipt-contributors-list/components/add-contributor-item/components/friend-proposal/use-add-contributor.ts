import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserId } from 'src/types/generic.types'
import { addContributor } from 'src/helpers/api/endpoints/receipt/receipt.api'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'

const useAddContributor = () => {
  const { receipt: oldReceipt } = useReceiptContext()

  const queryClient = useQueryClient()

  const receiptId = oldReceipt._id
  const mutationKey = ['receipt', { receiptId }]
  const queryKey = ['receipt', { receiptId }]

  const { mutate } = useMutation({
    mutationKey,
    mutationFn: addContributor,
    onSuccess: receipt => {
      queryClient.setQueryData(queryKey, receipt)
      queryClient.invalidateQueries({
        queryKey: ['receipt', { receiptId: receipt._id }, 'contributors'],
      })
    },
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

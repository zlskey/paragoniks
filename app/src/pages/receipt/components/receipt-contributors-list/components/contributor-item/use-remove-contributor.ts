import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserId } from 'src/types/generic.types'
import { removeContributor } from 'src/helpers/services/endpoints/receipt/receipt.service'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'

const useRemoveContributor = ({ contributorId }: { contributorId: UserId }) => {
  const queryClient = useQueryClient()
  const { receipt: oldReceipt } = useReceiptContext()

  const receiptId = oldReceipt._id
  const mutationKey = ['receipt', { receiptId }]
  const queryKey = ['receipt', { receiptId }]

  const { mutate } = useMutation({
    mutationKey,
    mutationFn: removeContributor,
    onMutate: async ({ contributorId }: { contributorId: UserId }) => {
      await queryClient.cancelQueries({ queryKey })

      queryClient.setQueryData(queryKey, () => ({
        ...oldReceipt,
        contributors: oldReceipt.contributors.filter(
          contributor => contributor !== contributorId
        ),
        products: oldReceipt.products.map(product => ({
          ...product,
          comprising: product.comprising.filter(
            comprising => comprising !== contributorId
          ),
        })),
      }))

      return { oldReceipt }
    },
    onError: (err, _, context) => {
      if (context?.oldReceipt) {
        queryClient.setQueryData(mutationKey, context.oldReceipt)
      }

      if (err) {
        console.error(err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      queryClient.invalidateQueries({
        queryKey: ['receipt', { receiptId }, 'contributors'],
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

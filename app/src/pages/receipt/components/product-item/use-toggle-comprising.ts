import { ProductId, UserId } from 'src/types/generic.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toggleProductComprising } from 'src/helpers/api/endpoints/receipt/receipt.api'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

interface UseToggleComprisingProps {
  productId: ProductId
}

const useToggleComprising = ({ productId }: UseToggleComprisingProps) => {
  const { receipt } = useReceiptContext()
  const user = useUser()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['receipt', { receiptId: receipt._id }],
    mutationFn: ({ userId }: { userId: UserId }) =>
      toggleProductComprising({
        receiptId: receipt._id,
        userId: userId || user._id,
        productId,
      }),
    onMutate: async ({ userId }) => {
      const updatedReceipt = {
        ...receipt,
        products: receipt.products.map(product => {
          if (product._id === productId) {
            const comprising = product.comprising.find(
              comprising => comprising === userId
            )

            if (comprising) {
              return {
                ...product,
                comprising: product.comprising.filter(
                  comprisingId => comprisingId !== userId
                ),
              }
            }

            return {
              ...product,
              comprising: [...product.comprising, userId],
            }
          }

          return product
        }),
      }

      queryClient.setQueryData(
        ['receipt', { receiptId: receipt._id }],
        updatedReceipt
      )

      return { previousValue: receipt }
    },
    onError: (_1, _2, context) => {
      if (!context) {
        return
      }

      queryClient.setQueryData(
        ['receipt', { receiptId: receipt._id }],
        context.previousValue
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['receipt', { receiptId: receipt._id }],
      })
    },
  })

  return mutate
}

export default useToggleComprising

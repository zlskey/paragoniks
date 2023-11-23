import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ProductId } from 'src/types/generic.types'
import { toggleProductComprising } from 'src/helpers/services/endpoints/receipt/receipt.service'
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
    mutationFn: () =>
      toggleProductComprising({
        receiptId: receipt._id,
        productId,
      }),
    onMutate: async () => {
      const updatedReceipt = {
        ...receipt,
        products: receipt.products.map(product => {
          if (product._id === productId) {
            const comprising = product.comprising.find(
              comprising => comprising === user._id
            )

            if (comprising) {
              return {
                ...product,
                comprising: product.comprising.filter(
                  comprisingId => comprisingId !== user._id
                ),
              }
            }

            return {
              ...product,
              comprising: [...product.comprising, user._id],
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

import Button from '@components/button'
import { PreciseEditFormValues } from 'src/views/product-edit/product-edit'
import { useFormContext } from 'react-hook-form'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { usePreciseProductEditContext } from 'src/views/product-edit/product-edit.context'
import { useRouter } from 'expo-router'
import useUpdateProduct from '@helpers/api-hooks/use-update-product'

function SaveButton() {
  const form = useFormContext<PreciseEditFormValues>()
  const addNotification = useNotificationContext()
  const { receipt, product } = usePreciseProductEditContext()

  const router = useRouter()

  const { mutate, isPending } = useUpdateProduct({
    receipt,
    onSuccess: () => {
      addNotification('Zapisano zmiany', 'success')
      router.back()
    },
  })

  async function onSubmit(data: PreciseEditFormValues) {
    mutate({
      receiptId: receipt._id,
      productId: product._id,
      product: data,
    })
  }

  const shouldDisable = !form.formState.isValid || isPending

  return (
    <Button onPress={form.handleSubmit(onSubmit)} isDisabled={shouldDisable}>
      Zapisz
    </Button>
  )
}

export default SaveButton

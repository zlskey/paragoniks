import type { PreciseEditFormValues } from 'src/views/product-edit/product-edit'
import Button from '@components/button'
import useUpdateProduct from '@helpers/api-hooks/use-update-product'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useRouter } from 'expo-router'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { usePreciseProductEditContext } from 'src/views/product-edit/product-edit.context'

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

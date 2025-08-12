import type { Receipt } from 'src/app/generic.types'
import Button from '@components/button'
import TextField from '@components/text-field'
import Wrapper from '@components/wrapper'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { receiptSchema } from '@helpers/validation-schemes/receipt'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { changeReceiptTitle } from 'src/api/endpoints/receipt/receipt.api'

const defaultValues = {
  title: '',
}

function ChangeReceiptTitle() {
  const { id } = useLocalSearchParams()

  const queryClient = useQueryClient()
  const addNotification = useNotificationContext()

  const receipt = queryClient.getQueryData<Receipt>(['receipt', id])

  const formState = useForm({
    defaultValues,
    resolver: yupResolver(receiptSchema.pick(['title'])),
  })

  const newTitle = formState.watch('title')

  const { mutate, isPending } = useMutation({
    mutationKey: ['receipt', id, 'title'],
    mutationFn: changeReceiptTitle,
    onSuccess: (data) => {
      queryClient.setQueryData(['receipt', id], data)
      router.back()
    },
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })

  function handleSubmit(data: typeof defaultValues) {
    mutate({
      receiptId: id as string,
      newTitle: data.title,
    })
  }

  useEffect(() => {
    formState.reset({
      title: receipt?.title,
    })
  }, [receipt])

  const buttonDisabled = !newTitle || isPending

  return (
    <FormProvider {...formState}>
      <Wrapper>
        <TextField
          error={formState.formState.errors.title}
          name="title"
          label="Nowy tytuł"
          fullWidth
          autoFocus
        />

        <Button
          onPress={formState.handleSubmit(handleSubmit)}
          isDisabled={buttonDisabled}
          variant="contained"
        >
          Potwierdź
        </Button>
      </Wrapper>
    </FormProvider>
  )
}

export default ChangeReceiptTitle

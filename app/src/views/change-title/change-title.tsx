import type { Receipt } from 'src/app/generic.types'

import Button from '@components/button'
import TextField from '@components/text-field'
import Wrapper from '@components/wrapper'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { changeReceiptTitle } from 'src/api/endpoints/receipt/receipt.api'
import * as yup from 'yup'

const defaultValues = {
  newTitle: '',
}

const schema = yup.object().shape({
  newTitle: yup
    .string()
    .required('Nazwa paragonu jest wymagana')
    .min(3, 'Nazwa paragonu musi mieć co najmniej 3 znaki')
    .max(30, 'Nazwa paragonu nie może mieć więcej niż 30 znaków'),
})

function ChangeReceiptTitle() {
  const { id } = useLocalSearchParams()

  const queryClient = useQueryClient()

  const receipt = queryClient.getQueryData<Receipt>(['receipt', id])

  const formState = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const newTitle = formState.watch('newTitle')

  const { mutate, isPending } = useMutation({
    mutationKey: ['receipt', id, 'title'],
    mutationFn: changeReceiptTitle,
    onSuccess: (data) => {
      queryClient.setQueryData(['receipt', id], data)
      router.back()
    },
  })

  function handleSubmit(data: typeof defaultValues) {
    mutate({
      receiptId: id as string,
      newTitle: data.newTitle,
    })
  }

  useEffect(() => {
    formState.reset({
      newTitle: receipt?.title,
    })
  }, [receipt])

  const buttonDisabled = !newTitle || isPending

  return (
    <FormProvider {...formState}>
      <Wrapper>
        <TextField
          error={formState.formState.errors.newTitle}
          name="newTitle"
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

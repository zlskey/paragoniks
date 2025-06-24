import type { CreateReceiptFormState } from './create-receipt-form'
import { createReceipt } from '@api/endpoints/receipt/receipt.api'
import Button from '@components/button'
import Flex from '@components/flex'
import Wrapper from '@components/wrapper'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useUserContext } from '@helpers/contexts/user.context'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import ContributorsSection from './contributors-section'
import { createReceiptDefaultValues, createReceiptFormSchema } from './create-receipt-form'
import ProductsSection from './products-section'
import ReceiptImageSection from './receipt-image-section'
import TitleSection from './title-section'

function CreateReceipt() {
  const { user } = useUserContext()
  const addNotification = useNotificationContext()

  const formState = useForm<CreateReceiptFormState>({
    defaultValues: createReceiptDefaultValues,
    resolver: yupResolver(createReceiptFormSchema),
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createReceipt,
    mutationKey: ['receipt', 'create'],
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['receipt'] })
      addNotification('Paragon dodany', 'success')
      router.replace('/(tabs)/home')
    },
  })

  function onSubmit({ contributors, ...data }: CreateReceiptFormState) {
    mutate({
      ...data,
      contributors: { ...contributors, [user._id]: 1 },
      shouldGenerateTitle: !formState.formState.touchedFields.title,
    })
  }

  return (
    <FormProvider {...formState}>
      <Wrapper>
        <Flex
          nativeFlex
          spacing={1}
          direction="column"
          alignContent="stretch"
          justifyContent="space-between"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <Flex
              pt={1}
              pr={1}
              pl={1}
              spacing={3}
              direction="column"
              alignContent="stretch"
            >
              <TitleSection />
              <ContributorsSection />
              <ReceiptImageSection />
              <ProductsSection />
            </Flex>
          </ScrollView>

          <Button
            isDisabled={isPending}
            onPress={formState.handleSubmit(onSubmit)}
          >
            Dodaj
          </Button>
        </Flex>
      </Wrapper>
    </FormProvider>
  )
}

export default CreateReceipt

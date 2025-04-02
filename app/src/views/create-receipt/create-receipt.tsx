import type { CreateReceiptFormState } from './create-receipt-form'
import Flex from '@components/flex'
import StackHeader from '@components/stack-header'
import Wrapper from '@components/wrapper'
import useCreateReceiptFromData from '@helpers/hooks/use-create-receipt-from-data'
import { yupResolver } from '@hookform/resolvers/yup'
import { router, useNavigation } from 'expo-router'
import React, { useLayoutEffect, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { createReceiptDefaultValues, createReceiptFormSchema } from './create-receipt-form'
import ProductsStep from './products-step'
import TitleStep from './title-step'

enum Step {
  TITLE,
  PRODUCTS,
}

function CreateReceipt() {
  const formState = useForm<CreateReceiptFormState>({
    defaultValues: createReceiptDefaultValues,
    resolver: yupResolver(createReceiptFormSchema),
  })
  const [currentStep, setCurrentStep] = useState<Step>(Step.TITLE)

  const navigation = useNavigation()

  function handleMoveToPreviousStep() {
    setCurrentStep(prev => prev - 1)
  }

  function handleMoveToNextStep() {
    setCurrentStep(prev => prev + 1)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <StackHeader
          title="Tworzenie paragonu"
          onGoBack={currentStep === Step.PRODUCTS ? handleMoveToPreviousStep : undefined}
        />
      ),
    })
  }, [currentStep])

  return (
    <FormProvider {...formState}>
      <Wrapper>
        <Flex direction="column" alignContent="stretch" pr={1} pl={1} pt={1} spacing={3} nativeFlex>
          <CreateReceiptContent
            step={currentStep}
            onMoveToNextStep={handleMoveToNextStep}
          />
        </Flex>
      </Wrapper>
    </FormProvider>
  )
}

interface CreateReceiptContentProps {
  step: Step
  onMoveToNextStep: () => void
}

function CreateReceiptContent({ step, onMoveToNextStep }: CreateReceiptContentProps) {
  const formContext = useFormContext<CreateReceiptFormState>()
  const { mutate, isPending } = useCreateReceiptFromData()

  function onSubmit(data: CreateReceiptFormState) {
    mutate(data, { onSettled: () => {
      router.dismiss(2)
    } })
  }

  switch (step) {
    case Step.TITLE:
      return <TitleStep onMoveToNextStep={onMoveToNextStep} />
    case Step.PRODUCTS:
      return (
        <ProductsStep
          isSubmiting={isPending}
          onSubmit={formContext.handleSubmit(onSubmit)}
        />
      )
  }
}

export default CreateReceipt

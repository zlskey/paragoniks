import type { CreateReceiptFormState } from '../create-receipt-form'
import Button from '@components/button'
import Flex from '@components/flex'
import TextField from '@components/text-field'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

interface TitleStepProps {
  onMoveToNextStep: () => void
}

function TitleStep({ onMoveToNextStep }: TitleStepProps) {
  const formContext = useFormContext<CreateReceiptFormState>()

  function handleNextStepClick() {
    if (formContext.formState.errors.title) {
      return
    }
    onMoveToNextStep()
  }

  const title = formContext.watch('title')

  useEffect(() => {
    formContext.trigger('title')
  }, [title])

  return (
    <>
      <TextField
        autoFocus
        name="title"
        label="Tytuł paragonu"
        error={formContext.formState.errors.title}
      />
      <Flex nativeFlex />
      <Button
        onPress={handleNextStepClick}
        isDisabled={!!formContext.formState.errors.title || !title.length}
      >
        Dalej
      </Button>
    </>
  )
}

export default TitleStep

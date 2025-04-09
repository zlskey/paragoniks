import type { CreateReceiptFormState } from './create-receipt-form'
import Button from '@components/button'
import Flex from '@components/flex'
import Wrapper from '@components/wrapper'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native-gesture-handler'
import ContributorsSection from './contributors-section'
import { createReceiptDefaultValues, createReceiptFormSchema } from './create-receipt-form'
import ProductsSection from './products-section'
import ReceiptImageSection from './receipt-image-section'
import TitleSection from './title-section'

function CreateReceipt() {
  const formState = useForm<CreateReceiptFormState>({
    defaultValues: createReceiptDefaultValues,
    resolver: yupResolver(createReceiptFormSchema),
  })

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
          <ScrollView>
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

          <Button>Dodaj</Button>
        </Flex>
      </Wrapper>
    </FormProvider>
  )
}

export default CreateReceipt

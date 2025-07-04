import type { DivisionType, Product } from 'src/app/generic.types'

import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'

import { getQueryInterval } from '@helpers/utils/get-query-interval'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { getReceipt } from 'src/api/endpoints/receipt/receipt.api'
import { colors } from 'src/app/styles'
import * as yup from 'yup'
import DivisionForm from './division-form'
import ProductEditTextField from './product-edit-text-field'
import PreciseProductEditProvider, {
  usePreciseProductEditContext,
} from './product-edit.context'
import SaveButton from './save-button'

export type PreciseEditFormValues = Omit<Product, '_id' | 'totalPrice'>

const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(80, 'Product name must be at most 30 characters'),

  price: yup
    .number()
    .required('Product price is required')
    .min(0, 'Product price must be at least 0')
    .max(100000, 'Product price must be at most 100000'),

  count: yup
    .number()
    .required('Product count is required')
    .min(0, 'Product count must be at least 0')
    .max(100000, 'Product count must be at most 100000'),

  discount: yup
    .number()
    .default(0)
    .required('Product discount is required')
    .min(0, 'Product discount must be at least 0')
    .max(100000, 'Product discount must be at most 100000'),

  division: yup.object().shape({
    '': yup
      .number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === 0 ? null : value,
      ),
  }),

  divisionType: yup
    .string()
    .required()
    .oneOf(['percentage', 'amount', 'shares'] as DivisionType[]),
})

function PreciseProductEdit() {
  const { product } = usePreciseProductEditContext()

  const formState = useForm<PreciseEditFormValues>({
    defaultValues: product,
    resolver: yupResolver(productSchema),
  })

  const { name, price, count, discount } = formState.formState.errors

  const nameError = name
  const pricingError = price ?? count ?? discount

  return (
    <Wrapper>
      <FormProvider {...formState}>
        <Flex nativeFlex spacing={1} direction="column" alignContent="stretch">
          <Flex direction="column" alignContent="stretch">
            <Flex>
              <ProductEditTextField name="name" label="Nazwa" />
            </Flex>

            {nameError && (
              <Typography variant="base1" styles={{ color: colors.red }}>
                {nameError.message}
              </Typography>
            )}
          </Flex>

          <Flex direction="column" alignContent="stretch">
            <Flex
              spacing={2}
              alignContent="stretch"
              justifyContent="space-between"
            >
              <ProductEditTextField
                name="price"
                label="Cena"
                keyboardType="numeric"
                precision={4}
              />

              <ProductEditTextField
                name="count"
                label="Ilość"
                keyboardType="numeric"
                precision={4}
              />

              <ProductEditTextField
                name="discount"
                label="Zniżka"
                keyboardType="numeric"
                precision={4}
              />
            </Flex>
            {pricingError && (
              <Typography variant="base1" styles={{ color: colors.red }}>
                {pricingError.message}
              </Typography>
            )}
          </Flex>

          <DivisionForm />
        </Flex>

        <SaveButton />
      </FormProvider>
    </Wrapper>
  )
}

function PreciseProductEditInternal() {
  const { id, productId } = useLocalSearchParams()

  const receiptId = id as string

  const { data: receipt } = useQuery({
    queryKey: ['receipt', receiptId],
    queryFn: () => getReceipt({ receiptId }),
    refetchInterval: getQueryInterval(2000),
    enabled: !!id,
  })

  const product = receipt?.products.find(product => product._id === productId)

  if (!product || !receipt) {
    return null
  }

  return (
    <PreciseProductEditProvider product={product} receipt={receipt}>
      <PreciseProductEdit />
    </PreciseProductEditProvider>
  )
}

export default PreciseProductEditInternal

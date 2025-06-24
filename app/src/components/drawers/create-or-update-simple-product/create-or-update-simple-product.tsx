import type { SimpleProduct } from '@app/generic.types'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type {
  CreateOrUpdateSimpleProductFormState,
} from './create-or-update-simple-product-form'
import { colors, getPx } from '@app/styles'
import Button from '@components/button'
import Drawer from '@components/drawer'
import Flex from '@components/flex'
import TextField from '@components/text-field'
import Typography from '@components/typography'
import { FontAwesome6 } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  createOrUpdateSimpleProductDefaultValues,
  createOrUpdateSimpleProductSchema,
} from './create-or-update-simple-product-form'

interface CreateOrUpdateSimpleProductProps {
  drawerRef: React.RefObject<BottomSheetModal>
  onSubmit: (data: SimpleProduct) => void
  productData: SimpleProduct | null
  onClose: () => void
}

function CreateOrUpdateSimpleProduct({ drawerRef, productData, onSubmit, onClose }: CreateOrUpdateSimpleProductProps) {
  const newProductForm = useForm<CreateOrUpdateSimpleProductFormState>({
    defaultValues: productData ?? createOrUpdateSimpleProductDefaultValues,
    resolver: yupResolver(createOrUpdateSimpleProductSchema),
    mode: 'onChange',
  })

  const pricingError = Object
    .entries(newProductForm.formState.errors)
    .reduce(
      (acc, [fieldName, error]) => fieldName !== 'name' && error.message ? error.message : acc,
      '',
    )

  const nameError = newProductForm.formState.errors.name?.message ?? ''

  function onDismiss() {
    newProductForm.reset()
    onClose()
  }

  return (
    <Drawer
      ref={drawerRef}
      onDismiss={onDismiss}
      title={productData ? 'Edytowanie produktu' : 'Nowy produkt'}
    >
      <Flex direction="column" alignContent="stretch" spacing={2} pb={2} pt={1} p={1}>
        <FormProvider {...newProductForm}>
          <Flex direction="column" alignContent="stretch">
            <Flex direction="column" alignContent="stretch">
              <TextField
                name="name"
                label="Nazwa produktu"
                placeholder="Kremówki"
                autoFocus
                fullWidth
                labelAlwaysOnTop
                style={{ backgroundColor: colors.secondPaper }}
              />
            </Flex>
            {nameError && (
              <Typography variant="base2" styles={{ color: colors.red }}>
                {nameError}
              </Typography>
            )}
          </Flex>

          <Flex direction="column" alignContent="stretch">
            <Flex spacing={2} justifyContent="space-between">
              <TextField
                style={{ backgroundColor: colors.secondPaper }}
                keyboardType="numeric"
                labelAlwaysOnTop
                name="price"
                label="Cena"
                fullWidth
              />
              <TextField
                style={{ backgroundColor: colors.secondPaper }}
                keyboardType="numeric"
                labelAlwaysOnTop
                name="count"
                label="Ilość"
                fullWidth
              />
              <TextField
                style={{ backgroundColor: colors.secondPaper }}
                keyboardType="numeric"
                labelAlwaysOnTop
                name="discount"
                label="Zniżka"
                fullWidth
              />
            </Flex>
            {pricingError && (
              <Typography variant="base2" styles={{ color: colors.red }}>
                {pricingError}
              </Typography>
            )}
          </Flex>

          <Button
            isDisabled={!!pricingError || !!nameError}
            onPress={newProductForm.handleSubmit(onSubmit)}
            startIcon={(
              <FontAwesome6
                name="add"
                size={getPx(3)}
                color={colors.text}
              />
            )}
            small
          >
            {productData ? 'Zapisz' : 'Dodaj'}
          </Button>
        </FormProvider>
      </Flex>
    </Drawer>
  )
}

export default CreateOrUpdateSimpleProduct

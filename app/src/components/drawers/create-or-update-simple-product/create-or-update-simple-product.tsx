import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { BaseProduct } from '@types'
import type {
  CreateOrUpdateSimpleProductFormState,
} from './create-or-update-simple-product-form'
import { getPx } from '@app/styles'
import Button from '@components/button'
import Drawer from '@components/drawer'
import Flex from '@components/flex'
import TextField from '@components/text-field'
import Typography from '@components/typography'
import { FontAwesome6 } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useTheme } from 'react-native-paper'
import {
  createOrUpdateSimpleProductDefaultValues,
  createOrUpdateSimpleProductSchema,
} from './create-or-update-simple-product-form'

interface CreateOrUpdateSimpleProductProps {
  drawerRef: React.RefObject<BottomSheetModal>
  onSubmit: (data: BaseProduct) => void
  productData: BaseProduct | null
  onClose: () => void
}

function CreateOrUpdateSimpleProduct({ drawerRef, productData, onSubmit, onClose }: CreateOrUpdateSimpleProductProps) {
  const { colors } = useTheme()
  const newProductForm = useForm<CreateOrUpdateSimpleProductFormState>({
    defaultValues: productData ?? createOrUpdateSimpleProductDefaultValues,
    resolver: yupResolver(createOrUpdateSimpleProductSchema),
    mode: 'onChange',
  })

  const pricingError = Object
    .entries(newProductForm.formState.errors)
    .reduce(
      (acc: string, [fieldName, error]) => fieldName !== 'name' && error?.message ? error.message : acc,
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
                style={{ backgroundColor: colors.surfaceVariant }}
              />
            </Flex>
            {nameError && (
              <Typography variant="base2" styles={{ color: colors.error }}>
                {nameError}
              </Typography>
            )}
          </Flex>

          <Flex direction="column" alignContent="stretch">
            <Flex spacing={2} justifyContent="space-between">
              <TextField
                style={{ backgroundColor: colors.surfaceVariant }}
                keyboardType="numeric"
                labelAlwaysOnTop
                name="price"
                label="Cena"
                fullWidth
              />
              <TextField
                style={{ backgroundColor: colors.surfaceVariant }}
                keyboardType="numeric"
                labelAlwaysOnTop
                name="count"
                label="Ilość"
                fullWidth
              />
              <TextField
                style={{ backgroundColor: colors.surfaceVariant }}
                keyboardType="numeric"
                labelAlwaysOnTop
                name="discount"
                label="Zniżka"
                fullWidth
              />
            </Flex>
            {pricingError && (
              <Typography variant="base2" styles={{ color: colors.error }}>
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
                color={colors.onBackground}
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

import type { SimpleProduct } from '@app/generic.types'
import type { CreateReceiptFormState } from '../create-receipt-form'
import { colors, getPx } from '@app/styles'
import Button from '@components/button'
import { useDrawerFunctions } from '@components/drawer'
import CreateOrUpdateSimpleProduct from '@components/drawers/create-or-update-simple-product'
import Flex from '@components/flex'
import { ProductItemInternal } from '@components/product-item/product-item'
import { ProductListInternal } from '@components/product-list/product-list'
import { Entypo, FontAwesome6 } from '@expo/vector-icons'
import { getTotalPrice } from '@helpers/utils/get-total-price'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface ProductsStepProps {
  onSubmit: () => void
  isSubmiting: boolean
}

function ProductsStep({ onSubmit, isSubmiting }: ProductsStepProps) {
  const formContext = useFormContext<CreateReceiptFormState>()
  const products = formContext.watch('products')
  const drawerRef = useDrawerFunctions()

  const [productFormEntityIndex, setProductFormEntityIndex] = useState<null | number>()

  function handleOnAddProductClick() {
    setProductFormEntityIndex(null)
    drawerRef.current?.present()
  }

  function handleOnEditProductClick(index: number) {
    setProductFormEntityIndex(index)
    drawerRef.current?.present()
  }

  function handleOnCreateOrUpdateProduct(data: SimpleProduct) {
    if (productFormEntityIndex === null) {
      formContext.setValue('products', [...products, data])
    }
    if (productFormEntityIndex) {
      const productsCopy = [...products]
      productsCopy[productFormEntityIndex] = data
      formContext.setValue('products', productsCopy)
    }

    setProductFormEntityIndex(undefined)
  }

  return (
    <Flex direction="column" alignContent="stretch" spacing={3} nativeFlex>
      {productFormEntityIndex !== undefined && (
        <CreateOrUpdateSimpleProduct
          onClose={() => setProductFormEntityIndex(undefined)}
          productData={productFormEntityIndex === null
            ? productFormEntityIndex
            : products[productFormEntityIndex]}
          drawerRef={drawerRef}
          onSubmit={handleOnCreateOrUpdateProduct}
        />
      )}

      <ProductListInternal
        products={products}
        renderProduct={(product, index) => (
          <ProductItemInternal
            showZeroDiscount
            product={product}
            onLongPress={() => handleOnEditProductClick(index)}
            total={getTotalPrice(product)}
          />
        )}
      />

      <Flex justifyContent="space-around" spacing={1} pt={4}>
        <Button
          small
          variant="outlined"
          startIcon={<Entypo name="add-to-list" size={getPx(3)} color={colors.text} />}
          onPress={handleOnAddProductClick}
        >
          Dodaj produkt
        </Button>
        <Button
          small

          startIcon={<FontAwesome6 name="add" size={getPx(3)} color={colors.text} />}
          isDisabled={!products.length || isSubmiting}
          onPress={onSubmit}
        >
          Stwórz paragon
        </Button>
      </Flex>
    </Flex>
  )
}

export default ProductsStep

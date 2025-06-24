import type { SimpleProduct } from '@app/generic.types'
import type { CreateReceiptFormState } from '@views/create-receipt/create-receipt-form'
import { colors, getPx } from '@app/styles'
import { useDrawerFunctions } from '@components/drawer'
import CreateOrUpdateSimpleProduct from '@components/drawers/create-or-update-simple-product'
import Flex from '@components/flex'
import Paper from '@components/paper'
import { ProductItemInternal } from '@components/product-item/product-item'
import { ProductListInternal } from '@components/product-list/product-list'
import SwipeableAction from '@components/swipeable-action'
import Typography from '@components/typography'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { getTotalPrice } from '@helpers/utils/get-total-price'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'

function ManualAddProductList() {
  const formContext = useFormContext<CreateReceiptFormState>()
  const products = formContext.watch('products')
  const drawerRef = useDrawerFunctions()

  const [productFormEntityIndex, setProductFormEntityIndex] = useState<number | null>(null)

  function handleOnAddProductClick() {
    setProductFormEntityIndex(null)
    drawerRef.current?.present()
  }

  function handleOnRemoveProduct(index: number) {
    formContext.setValue('products', products.filter((_, i) => i !== index))
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

    setProductFormEntityIndex(null)
    drawerRef.current?.dismiss()
  }

  return (
    <Flex direction="column" alignContent="stretch">
      <CreateOrUpdateSimpleProduct
        onClose={() => setProductFormEntityIndex(null)}
        productData={productFormEntityIndex === null
          ? productFormEntityIndex
          : products[productFormEntityIndex]}
        drawerRef={drawerRef}
        onSubmit={handleOnCreateOrUpdateProduct}
      />

      <Flex direction="column" alignContent="stretch" p={0.5}>
        <TouchableOpacity onPress={handleOnAddProductClick}>
          <Paper>
            <Flex
              styles={{ backgroundColor: colors.secondPaper }}
              justifyContent="space-between"
              alignContent="center"
              p={0.75}
            >
              <Flex alignContent="center" spacing={1}>
                <Entypo name="add-to-list" size={getPx(3)} color={colors.text} />
                <Typography>Dodaj produkt</Typography>
              </Flex>
            </Flex>
          </Paper>
        </TouchableOpacity>
      </Flex>

      <ProductListInternal
        products={products}
        scrollEnabled={false}
        style={{ maxHeight: 1000 }}
        renderProduct={(product, index) => (
          <ProductItemInternal
            showZeroDiscount
            product={product}
            total={getTotalPrice(product)}
            onLongPress={() => handleOnEditProductClick(index)}
            onSwipeableOpen={direction => direction === 'right' && handleOnRemoveProduct(index)}
            renderRightActions={() => (
              <SwipeableAction
                color="red"
                label="Usuń"
                endIcon={<AntDesign name="edit" size={getPx(2)} color="white" />}
              />
            )}
          />
        )}
      />
    </Flex>
  )
}

export default ManualAddProductList

import type { ReactElement } from 'react'
import type { FlatListProps } from 'react-native'
import { isProduct } from '@app/generic.types'
import { getPx } from '@app/styles'
import Typography from '@components/typography'
import { useQueryClient } from '@tanstack/react-query'
import { useReceiptContext } from '@views/receipt/receipt.context'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import ProductItemConnected from '../product-item'

interface ProductListInternalProps<T>
  extends Omit<FlatListProps<T>, 'data' | 'ListEmptyComponent' | 'renderItem' | 'keyExtractor'> {
  products: (T)[]
  renderProduct: (product: T, index: number) => ReactElement
}

export function ProductListInternal<T>({
  products,
  renderProduct,
  ...props
}: ProductListInternalProps<T>) {
  return (
    <FlatList
      ListEmptyComponent={(
        <Typography styles={{ padding: getPx(1) }}>
          Brak dodanych produktów
        </Typography>
      )}
      data={products}
      keyExtractor={(product, index) =>
        isProduct(product)
          ? product._id
          : index.toString()}
      renderItem={({ item: product, index }) => renderProduct(product, index)}
      {...props}
    />
  )
}

function ProductListConnected() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { receipt } = useReceiptContext()
  const queryClient = useQueryClient()

  async function handleRefreshReceipt() {
    setIsRefreshing(true)
    await queryClient.invalidateQueries({ queryKey: ['receipt', receipt._id] })
    setIsRefreshing(false)
  }

  return (
    <ProductListInternal
      products={receipt.products}
      refreshing={isRefreshing}
      onRefresh={handleRefreshReceipt}
      renderProduct={product => <ProductItemConnected product={product} />}
    />
  )
}

export default ProductListConnected

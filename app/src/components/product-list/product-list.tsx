import type { BaseProduct, Product } from '@types'
import type { ReactElement } from 'react'
import type { FlatListProps } from 'react-native'
import { getPx } from '@app/styles'
import Typography from '@components/typography'
import { useQueryClient } from '@tanstack/react-query'
import { isProduct } from '@types'
import { useReceiptContext } from '@views/receipt/receipt.context'
import { useState } from 'react'
import { FlatList } from 'react-native'
import ProductItemConnected from '../product-item'

interface ProductListInternalProps<T extends BaseProduct>
  extends Omit<FlatListProps<T>, 'data' | 'ListEmptyComponent' | 'renderItem' | 'keyExtractor'> {
  products: T[]
  renderProduct: (product: T, index: number) => ReactElement
}

export function ProductListInternal<T extends BaseProduct>({
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
          ? (product as Product)._id
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

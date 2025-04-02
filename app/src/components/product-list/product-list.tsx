import type { ReactElement } from 'react'
import { isProduct } from '@app/generic.types'
import { getPx } from '@app/styles'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import { useQueryClient } from '@tanstack/react-query'
import { useReceiptContext } from '@views/receipt/receipt.context'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import ProductItemConnected from '../product-item'

interface ProductListInternalProps<T> {
  products: (T)[]
  renderProduct: (product: T, index: number) => ReactElement
  isRefreshing?: boolean
  onRefreshReceipt?: () => void
}

export function ProductListInternal<T>({
  products,
  isRefreshing,
  onRefreshReceipt,
  renderProduct,
}: ProductListInternalProps<T>) {
  return (
    <Flex alignContent="stretch" direction="column" spacing={1} nativeFlex>
      <Typography variant="subtitle2">
        Produkty •
        {' '}
        {products.length}
      </Typography>

      <Paper>
        <FlatList
          ListEmptyComponent={(
            <Typography styles={{ padding: getPx(1) }}>
              Brak dodanych produktów
            </Typography>
          )}
          refreshing={isRefreshing}
          onRefresh={onRefreshReceipt}
          data={products}
          keyExtractor={(product, index) =>
            isProduct(product)
              ? product._id
              : index.toString()}
          renderItem={({ item: product, index }) => renderProduct(product, index)}
        />
      </Paper>
    </Flex>
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
      isRefreshing={isRefreshing}
      onRefreshReceipt={handleRefreshReceipt}
      renderProduct={product => <ProductItemConnected product={product} />}
    />
  )
}

export default ProductListConnected

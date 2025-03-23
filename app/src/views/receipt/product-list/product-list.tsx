import { FlatList } from 'react-native'
import Flex from '@components/flex'
import Paper from '@components/paper'
import ProductItem from './product-item/product-item'
import Typography from '@components/typography'
import { useQueryClient } from '@tanstack/react-query'
import { useReceiptContext } from 'src/views/receipt/receipt.context'
import { useState } from 'react'

function ProductList() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { receipt } = useReceiptContext()
  const queryClient = useQueryClient()

  async function refreshReceipt() {
    setIsRefreshing(true)
    await queryClient.invalidateQueries({ queryKey: ['receipt', receipt._id] })
    setIsRefreshing(false)
  }

  return (
    <Flex alignContent='stretch' direction='column' spacing={1} nativeFlex>
      <Typography variant='subtitle2'>
        Produkty • {receipt.products.length}
      </Typography>

      <Paper>
        <FlatList
          refreshing={isRefreshing}
          onRefresh={refreshReceipt}
          data={receipt.products}
          keyExtractor={product => product._id}
          renderItem={({ item }) => <ProductItem product={item} />}
        />
      </Paper>
    </Flex>
  )
}

export default ProductList

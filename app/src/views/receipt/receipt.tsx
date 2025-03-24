import Flex from '@components/flex'

import AddContributorIcon from '@components/icons/add-contributor-icon'
import ChangeTitleIcon from '@components/icons/change-title-icon'
import StackHeader from '@components/stack-header'
import Wrapper from '@components/wrapper'
import { useUserContext } from '@helpers/contexts/user.context'
import { getQueryInterval } from '@helpers/utils/get-query-interval'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useLayoutEffect } from 'react'
import { getReceipt } from 'src/api/endpoints/receipt/receipt.api'
import ContributorList from './contributor-list'
import ProductList from './product-list'
import ReceiptContextProvider from './receipt.context'
import ReceiptSkeleton from './receipt.skeleton'

function Receipt() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const user = useUserContext()

  const receiptId = id as string

  const { data: receipt } = useQuery({
    queryFn: () => getReceipt({ receiptId }),
    queryKey: ['receipt', receiptId],
    refetchInterval: getQueryInterval(2000),
    enabled: !!receiptId,
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <StackHeader
          title={receipt?.title}
          endAdornment={
            receipt?.owner === user.user._id && (
              <Flex spacing={2}>
                <ChangeTitleIcon />
                <AddContributorIcon />
              </Flex>
            )
          }
        />
      ),
    })
  }, [receipt?.title])

  if (!receipt)
    return <ReceiptSkeleton />

  return (
    <Wrapper>
      <ReceiptContextProvider value={{ receipt }}>
        <Flex
          nativeFlex
          direction="column"
          alignContent="stretch"
          spacing={2}
          pb={2}
        >
          <ContributorList />
          <ProductList />
        </Flex>
      </ReceiptContextProvider>
    </Wrapper>
  )
}

export default Receipt

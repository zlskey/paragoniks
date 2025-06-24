import Flex from '@components/flex'

import AddContributorIcon from '@components/icons/add-contributor-icon'
import ChangeTitleIcon from '@components/icons/change-title-icon'
import Paper from '@components/paper'
import ProductListConnected from '@components/product-list'
import StackHeader from '@components/stack-header'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { useUserContext } from '@helpers/contexts/user.context'
import { getQueryInterval } from '@helpers/utils/get-query-interval'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { getReceipt } from 'src/api/endpoints/receipt/receipt.api'
import ContributorList from './contributor-list'
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

  useEffect(() => {
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
  }, [receipt?.title, user.user._id, navigation])

  if (!receipt)
    return <ReceiptSkeleton />

  return (
    <Wrapper>
      <ReceiptContextProvider value={{ receipt }}>
        <ScrollView>
          <Flex
            nativeFlex
            direction="column"
            alignContent="stretch"
            spacing={2}
            pb={2}
          >
            <ContributorList />
            <Flex alignContent="stretch" direction="column" spacing={1} nativeFlex>
              <Typography variant="subtitle2">
                Produkty •
                {' '}
                {receipt.products.length}
              </Typography>

              <Paper>
                <ProductListConnected />
              </Paper>
            </Flex>
          </Flex>
        </ScrollView>
      </ReceiptContextProvider>
    </Wrapper>
  )
}

export default Receipt

import Flex from '@components/flex'

import SearchBar from '@components/search-bar'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import React, { useMemo, useState } from 'react'
import CreateReceiptButton from './create-receipt-button'
import MonthSectionsList from './month-section'
import useUserReceipts from './use-user-receipts'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data } = useUserReceipts()

  const filteredReceipts = useMemo(() => {
    return (data ?? []).filter(receipt =>
      receipt.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [data, searchQuery])

  return (
    <Wrapper>
      <SearchBar onSearch={setSearchQuery} query={searchQuery} />

      <Flex mt={2} alignContent="stretch" direction="column" nativeFlex>
        <Flex justifyContent="space-between">
          <Typography variant="subtitle">Twoje paragony</Typography>
          <CreateReceiptButton />
        </Flex>

        <Flex nativeFlex direction="column" alignContent="stretch">
          {filteredReceipts.length === 0 && (
            <Typography variant="subtitle2">
              Brak paragonów do wyświetlenia
            </Typography>
          )}

          <MonthSectionsList receipts={filteredReceipts} />
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default Home

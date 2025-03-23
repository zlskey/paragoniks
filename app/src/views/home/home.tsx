import { useMemo, useState } from 'react'

import Flex from '@components/flex'
import MonthSectionsList from './month-section'
import SearchBar from '@components/search-bar'
import Typography from '@components/typography'
import UploadReceiptButton from './upload-receipt-button'
import Wrapper from '@components/wrapper'
import useUserReceipts from './use-user-receipts'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data } = useUserReceipts()

  const filteredReceipts = useMemo(() => {
    return data.filter(receipt =>
      receipt.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [data, searchQuery])

  return (
    <Wrapper>
      <SearchBar onSearch={setSearchQuery} query={searchQuery} />

      <Flex mt={2} alignContent='stretch' direction='column' nativeFlex>
        <Flex justifyContent='space-between'>
          <Typography variant='subtitle'>Twoje paragony</Typography>

          <UploadReceiptButton />
        </Flex>

        <Flex nativeFlex direction='column' alignContent='stretch'>
          {filteredReceipts.length === 0 && (
            <Typography variant='subtitle2'>
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

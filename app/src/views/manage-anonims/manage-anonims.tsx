import AnonimList from './anonim-list'
import Flex from '@components/flex'
import SearchBar from '@components/search-bar'
import Wrapper from '@components/wrapper'
import { getAllAnonims } from '@api/endpoints/anonim/anonim.api'
import { useQuery } from '@tanstack/react-query'

function ManageAnonim() {
  const { data, isLoading } = useQuery({
    queryKey: ['anonims', 'all'],
    queryFn: getAllAnonims,
  })

  if (!data || isLoading) {
    return null
  }

  return (
    <Wrapper>
      <Flex direction='column' alignContent='stretch' spacing={2}>
        <SearchBar />

        <AnonimList anonims={data} />
      </Flex>
    </Wrapper>
  )
}

export default ManageAnonim

import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import useProfiles from '@helpers/hooks/use-profiles'
import React from 'react'
import { FlatList } from 'react-native'
import { useReceiptContext } from 'src/views/receipt/receipt.context'
import ContributorItem from './contributor-item'
import ContributorListSkeleton from './contributor-list.skeleton'

function ContributorList() {
  const { receipt } = useReceiptContext()

  const { contributors } = receipt
  const contributorsIds = Object.keys(contributors)

  const { profiles, isLoading } = useProfiles(contributorsIds)

  if (isLoading) {
    return <ContributorListSkeleton />
  }

  return (
    <Flex direction="column" alignContent="stretch" spacing={1}>
      <Typography variant="subtitle2">
        Podzielone między •
        {' '}
        {profiles.length}
      </Typography>

      <Paper>
        <FlatList
          data={profiles}
          keyExtractor={contributor => contributor._id}
          renderItem={({ item }) => <ContributorItem contributor={item} />}
        />
      </Paper>
    </Flex>
  )
}

export default ContributorList

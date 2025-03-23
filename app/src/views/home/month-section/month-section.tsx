import { SectionList, View } from 'react-native'
import { colors, getPx } from 'src/app/styles'

import React from 'react'
import { Receipt } from 'src/app/generic.types'
import ReceiptItem from './receipt-item'
import Typography from '@components/typography'
import { getReceiptsSplittedByMonth } from '@helpers/utils'
import getSectionListItemWrapper from '@helpers/utils/get-section-list-item-wrapper'
import { useQueryClient } from '@tanstack/react-query'

interface MonthSectionProps {
  receipts: Receipt[]
}

const MonthSectionList = React.memo(({ receipts }: MonthSectionProps) => {
  const queryClient = useQueryClient()
  const isLoading = queryClient.isFetching({ queryKey: ['receipt'] })

  function onRefresh() {
    queryClient.invalidateQueries({
      queryKey: ['receipt'],
    })
  }

  return (
    <SectionList
      refreshing={!!isLoading}
      onRefresh={onRefresh}
      sections={getReceiptsSplittedByMonth(receipts)}
      keyExtractor={receipt => receipt._id}
      renderItem={data =>
        getSectionListItemWrapper(
          data.index,
          data.section.data.length,
          <ReceiptItem receipt={data.item} />
        )
      }
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{
            backgroundColor: colors.background,
            paddingBottom: getPx(1),
          }}
        >
          <Typography>{title}</Typography>
        </View>
      )}
      stickySectionHeadersEnabled
    />
  )
})

export default MonthSectionList

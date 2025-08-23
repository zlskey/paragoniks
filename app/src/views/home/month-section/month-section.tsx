import type { Receipt } from '@types'
import Typography from '@components/typography'
import { getReceiptsSplittedByMonth } from '@helpers/utils'
import getSectionListItemWrapper from '@helpers/utils/get-section-list-item-wrapper'
import { useQueryClient } from '@tanstack/react-query'
import { ScanningStatus } from '@types'
import React, { useState } from 'react'
import { SectionList, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { getPx } from 'src/app/styles'
import ReceiptCreatingItem from './receipt-creating-item'
import ReceiptItem from './receipt-item'

interface MonthSectionProps {
  receipts: Receipt[]
}

const MonthSectionList = React.memo(({ receipts }: MonthSectionProps) => {
  const queryClient = useQueryClient()
  const [isLoading, setisLoading] = useState(false)
  const { colors } = useTheme()

  async function onRefresh() {
    setisLoading(true)
    await queryClient.invalidateQueries({
      queryKey: ['receipt'],
    })
    setisLoading(false)
  }

  return (
    <SectionList
      style={{ flex: 1 }}
      refreshing={isLoading}
      onRefresh={onRefresh}
      sections={getReceiptsSplittedByMonth(receipts)}
      keyExtractor={receipt => receipt._id}
      renderItem={data =>
        getSectionListItemWrapper(
          data.index,
          data.section.data.length,
          <MonthSectionListItem receipt={data.item} />,
        )}
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

interface MonthSectionListItemProps {
  receipt: Receipt
}

function MonthSectionListItem({ receipt }: MonthSectionListItemProps) {
  if (receipt.scanning?.status === ScanningStatus.DONE) {
    return <ReceiptItem receipt={receipt} />
  }

  return <ReceiptCreatingItem receipt={receipt} />
}

export default MonthSectionList

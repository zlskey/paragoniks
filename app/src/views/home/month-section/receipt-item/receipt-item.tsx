import type { Receipt } from 'src/app/generic.types'
import Avatar from '@components/avatar'

import AvatarGroup from '@components/avatar-group'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { useUserContext } from '@helpers/contexts/user.context'
import useProfiles from '@helpers/hooks/use-profiles'
import { getLocaleCurrency, getLocaleDate } from '@helpers/utils/locale'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { colors } from 'src/app/styles'
import RemoveReceiptAction from './remove-receipt-action'
import useRemoveReceipt from './use-remove-receipt'

interface ReceiptItemProps {
  receipt: Receipt
}

function ReceiptItem({ receipt }: ReceiptItemProps) {
  const { mutate: handleRemoveReceipt } = useRemoveReceipt({
    receiptId: receipt._id,
  })
  const { profiles } = useProfiles(Object.keys(receipt.contributors))
  const { user } = useUserContext()

  const queryClient = useQueryClient()

  function handleSwipeableOpen(direction: 'left' | 'right') {
    if (direction === 'right') {
      handleRemoveReceipt()
    }
  }

  function handlePress() {
    queryClient.setQueryData(['receipt', receipt._id], receipt)
    router.push({
      pathname: '/receipt/[id]',
      params: { id: receipt._id },
    })
  }

  const { createdAt, sum, title } = receipt

  const createdAtText = useMemo(() => getLocaleDate(createdAt), [createdAt])
  const sumText = useMemo(() => getLocaleCurrency(sum), [sum])
  const ownerProfile = useMemo(
    () => profiles.find(profile => profile._id === receipt.owner),
    [profiles, receipt.owner],
  )
  const isOwner = useMemo(
    () => receipt.owner === user._id,
    [receipt.owner, user._id],
  )

  return (
    <Swipeable
      friction={1}
      onSwipeableOpen={handleSwipeableOpen}
      renderRightActions={() => isOwner && <RemoveReceiptAction />}
    >
      <View style={{ backgroundColor: colors.paper }}>
        <TouchableOpacity onPress={handlePress}>
          <Flex justifyContent="space-between" alignContent="center" p={1.5}>
            <Flex alignContent="center" spacing={1}>
              <Avatar size="sm" profile={ownerProfile} />

              <Flex direction="column">
                <Typography variant="subtitle2">{title}</Typography>

                <Flex alignContent="center" spacing={1}>
                  <Typography opacity>{createdAtText}</Typography>
                  <Typography opacity>|</Typography>
                  <AvatarGroup profiles={profiles} />
                </Flex>
              </Flex>
            </Flex>

            <Typography variant="subtitle2">{sumText}</Typography>
          </Flex>
        </TouchableOpacity>
      </View>
    </Swipeable>
  )
}

export default ReceiptItem

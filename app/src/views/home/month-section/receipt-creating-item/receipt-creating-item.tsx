import type { Receipt } from '@types'
import Avatar from '@components/avatar'
import AvatarGroup from '@components/avatar-group'
import Fade from '@components/fade'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import useProfiles from '@helpers/hooks/use-profiles'
import { getLocaleDate } from '@helpers/utils/locale'
import { ScanningStatus } from '@types'
import { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import useRemoveReceipt from '../receipt-item/use-remove-receipt'

interface ReceiptCreatingItemProps {
  receipt: Receipt
}

function ReceiptCreatingItem({ receipt }: ReceiptCreatingItemProps) {
  const { colors } = useTheme()
  const { mutate: handleRemoveReceipt } = useRemoveReceipt({ receiptId: receipt._id })
  const { profiles } = useProfiles(Object.keys(receipt.contributors))

  const createdAtText = useMemo(() => getLocaleDate(receipt.createdAt), [receipt.createdAt])
  const ownerProfile = useMemo(
    () => profiles.find((profile: any) => profile._id === receipt.owner),
    [profiles, receipt.owner],
  )

  const addNotification = useNotificationContext()

  useEffect(() => {
    if (receipt.scanning?.status === ScanningStatus.FAILED) {
      addNotification(receipt.scanning.errorMessage ?? SOMETHING_WENT_WRONG_MESSAGE, 'error')
      handleRemoveReceipt()
    }
  }, [receipt.scanning])

  return (
    <View style={{ backgroundColor: colors.surface }}>
      <Fade duration={1500}>
        <Flex justifyContent="space-between" alignContent="center" p={1.5}>
          <Flex alignContent="center" spacing={1}>
            <Avatar size="sm" profile={ownerProfile} />

            <Flex direction="column">
              <Typography opacity variant="subtitle2">
                Paragon w trakcie tworzenia
              </Typography>

              <Flex alignContent="center" spacing={1}>
                <Typography opacity>{createdAtText}</Typography>
                <Typography opacity>|</Typography>
                <AvatarGroup profiles={profiles} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Fade>
    </View>
  )
}

export default ReceiptCreatingItem

import type { Product } from 'src/app/generic.types'

import AvatarGroup from '@components/avatar-group'
import Flex from '@components/flex'
import Typography from '@components/typography'
import useUpdateProduct from '@helpers/api-hooks/use-update-product'
import { useUserContext } from '@helpers/contexts/user.context'
import useProfiles from '@helpers/hooks/use-profiles'
import useUserCutCalc from '@helpers/hooks/use-user-cut-calc'
import { getLocaleCurrency } from '@helpers/utils'
import { getEvenDivision } from '@helpers/utils/division'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { View } from 'react-native'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from 'src/app/styles'
import { useReceiptContext } from 'src/views/receipt/receipt.context'
import RemoveProductAction from './remove-product-action'
import useRemoveProduct from './remove-product-action/use-remove-product'

interface ProductItemProps {
  product: Product
}

function ProductItem({ product }: ProductItemProps) {
  const { user } = useUserContext()
  const { receipt } = useReceiptContext()
  const { mutate } = useUpdateProduct({ receipt })
  const userCut = useUserCutCalc(product, user._id)
  const handleRemoveProduct = useRemoveProduct({ productId: product._id })

  const { division, divisionType, totalPrice, price, count, discount } = product

  const contributingUsers = useMemo(
    () =>
      Object.entries(division).flatMap(([userId, amount]) =>
        amount ? userId : [],
      ),
    [division, user._id],
  )

  const { profiles } = useProfiles(contributingUsers)

  const priceText = useMemo(() => getLocaleCurrency(price), [price])
  const countText = useMemo(() => `* ${count}`, [count])
  const discountText = useMemo(
    () => (discount ? `- ${getLocaleCurrency(Math.abs(discount))}` : ''),
    [discount],
  )

  const isComprising = useMemo(() => division[user._id], [division, user._id])
  const isOwner = useMemo(
    () => receipt.owner === user._id,
    [receipt.owner, user._id],
  )

  function handleLongPress() {
    if (isOwner) {
      router.push({
        pathname: '/receipt/[id]/[productId]',
        params: {
          id: receipt._id,
          productId: product._id,
        },
      })
    }
  }

  function handlePress() {
    mutate({
      receiptId: receipt._id,
      productId: product._id,
      product: {
        ...product,
        division: getEvenDivision({
          userToToggle: user._id,
          division,
          divisionType,
          numberToSplit: divisionType === 'percentage' ? 100 : totalPrice,
        }),
      },
    })
  }

  return (
    <Swipeable
      friction={1}
      onSwipeableOpen={direction =>
        direction === 'right' && handleRemoveProduct()}
      renderRightActions={() => isOwner && <RemoveProductAction />}
    >
      <View style={{ backgroundColor: colors.paper }}>
        <TouchableOpacity onLongPress={handleLongPress} onPress={handlePress}>
          <Flex
            direction="column"
            alignContent="stretch"
            p={1.25}
            spacing={0.5}
          >
            <Flex justifyContent="space-between" nativeFlex>
              <Flex nativeFlex>
                <Typography numberOfLines={1} ellipsizeMode="tail">
                  {product.name}
                </Typography>
              </Flex>

              <Typography
                styles={{ color: isComprising ? colors.primary : colors.text }}
              >
                {userCut}
              </Typography>
            </Flex>

            <Flex justifyContent="space-between">
              <Typography opacity variant="base2">
                {priceText}
                {' '}
                {countText}
                {' '}
                {discountText}
              </Typography>

              <AvatarGroup profiles={profiles} />
            </Flex>
          </Flex>
        </TouchableOpacity>
      </View>
    </Swipeable>
  )
}

export default ProductItem

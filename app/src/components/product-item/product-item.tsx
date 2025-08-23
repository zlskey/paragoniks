import type { BaseProduct, Product, Profile } from '@types'
import AvatarGroup from '@components/avatar-group'
import Flex from '@components/flex'
import Typography from '@components/typography'
import useUpdateProduct from '@helpers/api-hooks/use-update-product'
import { useUserContext } from '@helpers/contexts/user.context'
import useProfiles from '@helpers/hooks/use-profiles'
import useRemoveProduct from '@helpers/hooks/use-remove-product'
import useUserCutCalc from '@helpers/hooks/use-user-cut-calc'
import { getLocaleCurrency } from '@helpers/utils'
import { getEvenDivision } from '@helpers/utils/division'
import { useReceiptContext } from '@views/receipt/receipt.context'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { View } from 'react-native'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import RemoveProductAction from './remove-product-action'

interface ProductItemInternalProps {
  total: number | string
  product: BaseProduct
  profiles?: Profile[]
  onPress?: () => void
  onLongPress?: () => void
  highlightTotal?: boolean
  showZeroDiscount?: boolean
  renderRightActions?: () => React.ReactNode
  onSwipeableOpen?: ((direction: 'left' | 'right') => void)
}

export function ProductItemInternal({
  total,
  product,
  profiles = [],
  onPress,
  onLongPress,
  highlightTotal,
  onSwipeableOpen,
  showZeroDiscount,
  renderRightActions,
}: ProductItemInternalProps) {
  const { colors } = useTheme()
  const { price, count, discount, name } = product

  const priceText = useMemo(() => getLocaleCurrency(price), [price])
  const countText = useMemo(() => `* ${count}`, [count])
  const discountText = useMemo(
    () => (discount || showZeroDiscount ? `- ${getLocaleCurrency(Math.abs(discount))}` : ''),
    [discount],
  )

  return (
    <Swipeable
      friction={1}
      dragOffsetFromRightEdge={5}
      onSwipeableOpen={onSwipeableOpen}
      renderRightActions={renderRightActions}
    >
      <View style={{ backgroundColor: colors.surface }}>
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
          <Flex
            direction="column"
            alignContent="stretch"
            p={1.25}
            spacing={0.5}
          >
            <Flex justifyContent="space-between" nativeFlex>
              <Flex nativeFlex>
                <Typography numberOfLines={1} ellipsizeMode="tail">
                  {name}
                </Typography>
              </Flex>

              <Typography
                styles={{ color: highlightTotal ? colors.primary : colors.onBackground }}
              >
                {typeof total === 'number' ? getLocaleCurrency(total) : total}
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

interface ProductItemConnectedProps {
  product: Product
}

function ProductItemConnected({ product }: ProductItemConnectedProps) {
  const { user } = useUserContext()
  const { receipt } = useReceiptContext()
  const { mutate } = useUpdateProduct({ receipt })
  const userCut = useUserCutCalc(product, user._id)
  const handleRemoveProduct = useRemoveProduct({ productId: product._id })

  const contributingUsers = useMemo(
    () =>
      Object.entries(product.division).flatMap(([userId, amount]: [string, any]) =>
        amount ? userId : [],
      ),
    [product.division, user._id],
  )

  const { profiles } = useProfiles(contributingUsers)

  const isComprising = useMemo(() => !!product.division[user._id], [product.division, user._id])
  const isOwner = useMemo(
    () => receipt.owner === user._id,
    [receipt.owner, user._id],
  )

  function handleLongPress() {
    router.push({
      pathname: '/receipt/[id]/[productId]',
      params: {
        id: receipt._id,
        productId: product._id,
      },
    })
  }

  function handlePress() {
    mutate({
      receiptId: receipt._id,
      productId: product._id,
      product: {
        ...product,
        division: getEvenDivision({
          userToToggle: user._id,
          division: product.division,
          divisionType: product.divisionType,
          numberToSplit: product.divisionType === 'percentage' ? 100 : product.totalPrice,
        }),
      },
    })
  }

  return (
    <ProductItemInternal
      total={userCut}
      product={product}
      profiles={profiles}
      onPress={handlePress}
      highlightTotal={isComprising}
      onLongPress={handleLongPress}
      onSwipeableOpen={direction =>
        direction === 'right' && handleRemoveProduct()}
      renderRightActions={() => isOwner && <RemoveProductAction />}

    />
  )
}

export default ProductItemConnected

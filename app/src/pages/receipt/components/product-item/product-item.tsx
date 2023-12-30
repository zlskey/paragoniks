import { CardActionArea, IconButton, Stack, Typography } from '@mui/material'
import {
  ProductItemAvatarGroup,
  ProductItemContainer,
} from './product-item.styled'

import EditIcon from '@mui/icons-material/EditOutlined'
import { ProductItemProps } from './product-item.types'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { getPrice } from 'src/helpers/utils/get-price'
import { useMemo } from 'react'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import useToggleComprising from './use-toggle-comprising'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

const ProductItem = ({ product, onEdit }: ProductItemProps) => {
  const { receipt, contributors } = useReceiptContext()

  const user = useUser()

  const handleToggleComprising = useToggleComprising({ productId: product._id })

  const isComprising = product.comprising.includes(user._id)

  const isOwner = receipt.owner === user._id

  const onToggleComprising = () => {
    handleToggleComprising()
  }

  const userCut = useMemo(() => {
    const cut =
      (product.price - (product.discount || 0) * product.count) /
      product.comprising.length

    const userCutRaw = isComprising ? cut : 0

    return getPrice(userCutRaw)
  }, [product.comprising])

  return (
    <ProductItemContainer>
      <Stack direction='row' alignItems='center'>
        <CardActionArea onClick={onToggleComprising}>
          <Stack
            p={2}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
          >
            <Stack spacing={1}>
              <Typography>{product.name}</Typography>

              <Typography variant='body2' color='lightgray'>
                {getPrice(product.price)} * {product.count}
                {product.discount && ` - ${getPrice(product.discount)}`}
              </Typography>
            </Stack>

            <Typography color={isComprising ? 'primary' : undefined}>
              {userCut}
            </Typography>
          </Stack>
        </CardActionArea>

        {isOwner && (
          <Stack alignItems='center' p={1}>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>

      <ProductItemAvatarGroup max={10}>
        {contributors
          .filter(contributor => product.comprising.includes(contributor._id))
          .sort((a, b) => a.username.localeCompare(b.username))
          .map(profile => (
            <UserAvatar key={profile._id} profile={profile} />
          ))}
      </ProductItemAvatarGroup>
    </ProductItemContainer>
  )
}

export default ProductItem

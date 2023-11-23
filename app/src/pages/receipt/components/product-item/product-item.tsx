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

const ProductItem = ({ productId, onEdit }: ProductItemProps) => {
  const user = useUser()
  const { receipt, contributors } = useReceiptContext()

  const product = receipt.products.find(product => product._id === productId)

  if (!product) {
    return null
  }

  const handleToggleComprising = useToggleComprising({ productId })

  const isComprising = product.comprising.includes(user._id)

  const userCut = useMemo(() => {
    const cut = (product.price * product.count) / product.comprising.length

    const userCutRaw = isComprising ? cut : 0

    return getPrice(userCutRaw)
  }, [product.comprising])

  const isOwner = receipt.owner === user._id

  return (
    <ProductItemContainer>
      <CardActionArea onClick={() => handleToggleComprising()}>
        <Stack p={2} direction='row' justifyContent='space-between' spacing={2}>
          <Stack spacing={1}>
            <Typography>{product.name}</Typography>

            <Typography variant='body2' color='lightgray'>
              {getPrice(product.price)} * {product.count}
            </Typography>
          </Stack>

          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography color={isComprising ? 'primary' : undefined}>
              {userCut}
            </Typography>

            {isOwner && (
              <IconButton onClick={() => onEdit(product)}>
                <EditIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </CardActionArea>

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

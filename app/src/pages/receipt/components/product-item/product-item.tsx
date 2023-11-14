import {
  Avatar,
  AvatarGroup,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import EditIcon from '@mui/icons-material/EditOutlined'
import { ProductItemProps } from './product-item.types'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { getPrice } from 'src/helpers/utils/get-price'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { toggleProductComprising } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const ProductItem = ({ product, isOwner, onEdit }: ProductItemProps) => {
  const user = useAppSelector(selectUser)

  const { receiptId } = useParams()

  const userCut = useMemo(() => {
    const isComprising = product.comprising.includes(user?._id || '')
    const cut = (product.price * product.count) / product.comprising.length

    return getPrice(isComprising ? cut : 0)
  }, [product.comprising])

  const dispatch = useAppDispatch()

  const toggleComprising = () => {
    if (!receiptId || !product._id) {
      return
    }

    dispatch(toggleProductComprising({ receiptId, productId: product._id }))
  }

  return (
    <ListItem
      secondaryAction={
        isOwner && (
          <IconButton onClick={() => onEdit(product)}>
            <EditIcon />
          </IconButton>
        )
      }
    >
      <ListItemButton onClick={toggleComprising}>
        <ListItemText
          primary={product.name}
          secondary={`x ${product.count}`}
          primaryTypographyProps={{ display: 'inline', mr: 1 }}
          secondaryTypographyProps={{ display: 'inline' }}
        />

        <ListItemIcon>
          <Stack direction='row' alignItems='center' spacing={1}>
            <AvatarGroup>
              <Avatar sx={{ visibility: 'hidden' }} />

              {product.comprising.map(friend => (
                <UserAvatar key={friend} userId={friend} />
              ))}
            </AvatarGroup>

            <Typography>{userCut}</Typography>
          </Stack>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export default ProductItem

import {
  Avatar,
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
import ProductItemSkeleton from './product-item.skeleton'
import { getPrice } from 'src/helpers/utils/get-price'
import { receiptToggleProductComprising } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectReceiptLoading } from 'src/helpers/reducers/receipt/receipt.reducer'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useParams } from 'react-router-dom'

const ProductItem = ({ product, isOwner, onEdit }: ProductItemProps) => {
  const user = useAppSelector(selectUser)

  const { id } = useParams()

  const isComprising = product.comprising.includes(user?.username || '')

  const userCut = getPrice(
    isComprising
      ? (product.price * product.count) / product.comprising.length
      : 0
  )

  const dispatch = useAppDispatch()

  const toggleComprising = () => {
    if (!id || !product._id) {
      return
    }

    dispatch(
      receiptToggleProductComprising({ receiptId: id, productId: product._id })
    )
  }

  const isLoading = useAppSelector(selectReceiptLoading) === 'pending'

  if (isLoading) {
    return <ProductItemSkeleton />
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
            <Avatar sx={{ visibility: 'hidden' }} />

            {product.comprising.map(friend => (
              <Avatar alt={friend} key={friend} src='#' />
            ))}

            <Typography>{userCut}</Typography>
          </Stack>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export default ProductItem

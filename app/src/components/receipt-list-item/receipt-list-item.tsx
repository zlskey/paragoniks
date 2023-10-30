import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { Item } from 'src/types/generic.types'
import { getPrice } from 'src/helpers/utils/get-price'
import { receiptToggleItemComprising } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectReceiptLoading } from 'src/helpers/reducers/receipt/receipt.reducer'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useParams } from 'react-router-dom'
import useRandomizedValues from 'src/helpers/hooks/use-randomized-values'

interface ReceiptListItemProps {
  item: Item
}

const ReceiptListItem = ({ item }: ReceiptListItemProps) => {
  const user = useAppSelector(selectUser)

  const { id } = useParams()

  const isComprising = item.comprising.includes(user?.username || '')

  const price = getPrice(
    isComprising ? (item.value * item.count) / item.comprising.length : 0
  )

  const dispatch = useAppDispatch()

  const toggleComprising = () => {
    if (!id || !item._id) {
      return
    }

    dispatch(receiptToggleItemComprising({ receiptId: id, itemId: item._id }))
  }

  const isLoading = useAppSelector(selectReceiptLoading) === 'pending'

  if (isLoading) {
    return <ReceiptListItemSkeleton />
  }

  return (
    <ListItem>
      <ListItemButton onClick={toggleComprising}>
        <ListItemText>
          <Stack direction='row' spacing={1} alignItems='flex-end'>
            <Typography>{item.name}</Typography>
            <Typography color='grey' variant='body2'>
              x {item.count}
            </Typography>
          </Stack>
        </ListItemText>

        <ListItemIcon>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Avatar sx={{ visibility: 'hidden' }} />
            {item.comprising.map(friend => (
              <Avatar alt={friend} key={friend} src='#' />
            ))}

            <Typography>{price}</Typography>
          </Stack>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export const ReceiptListItemSkeleton = () => {
  const nameWidth = useRandomizedValues(70, 150)
  const countWidth = useRandomizedValues(10, 30)
  const priceWidth = useRandomizedValues(30, 50)

  return (
    <ListItem>
      <ListItemButton>
        <ListItemText>
          <Stack direction='row' spacing={1} alignItems='flex-end'>
            <Skeleton variant='text' width={nameWidth} />
            <Skeleton variant='text' width={countWidth} />
          </Stack>
        </ListItemText>

        <ListItemIcon>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Skeleton variant='circular' height={40} width={40} />
            <Skeleton variant='text' width={priceWidth} />
          </Stack>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export default ReceiptListItem

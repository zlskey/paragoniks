import {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material'

import useRandomizedValues from 'src/helpers/hooks/use-randomized-values'

export const FriendItemSkeleton = () => {
  const usernameWidth = useRandomizedValues(50, 100)

  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton variant='circular' height={40} width={40} />
      </ListItemAvatar>

      <ListItemText
        primary={<Skeleton variant='text' width={usernameWidth} />}
      />

      <ListItemIcon>
        <Skeleton variant='circular' height={40} width={40} />
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendItemSkeleton

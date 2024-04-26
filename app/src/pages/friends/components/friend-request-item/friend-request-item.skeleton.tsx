import {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
} from '@mui/material'

const FriendRequestItemSkeleton = () => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton variant='circular' height={40} width={40} />
      </ListItemAvatar>

      <ListItemText primary={<Skeleton width={100} />} />

      <ListItemIcon>
        <Stack direction='row' spacing={1}>
          <Skeleton variant='circular' height={40} width={40} />

          <Skeleton variant='circular' height={40} width={40} />
        </Stack>
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendRequestItemSkeleton

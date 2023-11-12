import {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from '@mui/material'

import useRandomizedValues from 'src/helpers/hooks/use-randomized-values'

const ContributorItemSkeleton = () => {
  const usernameWidth = useRandomizedValues(50, 100)
  const percentageWidth = useRandomizedValues(10, 20)

  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton variant='circular' height={40} width={40} />
      </ListItemAvatar>

      <ListItemText>
        <ListItemText
          primary={<Skeleton variant='text' width={usernameWidth} />}
        />
      </ListItemText>

      <ListItemIcon>
        <Skeleton variant='text' width={percentageWidth} />
      </ListItemIcon>
    </ListItem>
  )
}

export default ContributorItemSkeleton

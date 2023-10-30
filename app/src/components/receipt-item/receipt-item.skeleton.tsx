import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
} from '@mui/material'

import useRandomizedValues from 'src/helpers/hooks/use-randomized-values'

const ReceiptItemSkeleton = () => {
  const titleWidth = useRandomizedValues(40, 100)

  return (
    <ListItem
      secondaryAction={
        <IconButton>
          <Skeleton variant='circular' height={40} width={40} />
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemText
          primary={<Skeleton variant='text' width={titleWidth} />}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default ReceiptItemSkeleton

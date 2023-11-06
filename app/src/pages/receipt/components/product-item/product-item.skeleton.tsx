import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
} from '@mui/material'

import useRandomizedValues from 'src/helpers/hooks/use-randomized-values'

const ProductItemSkeleton = () => {
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

export default ProductItemSkeleton

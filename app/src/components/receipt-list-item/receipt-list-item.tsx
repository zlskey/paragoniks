import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

import { getPrice } from 'src/helpers/utils/get-price'

const ReceiptListItem = () => {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemText>Bułka</ListItemText>

        <ListItemIcon>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Avatar>S</Avatar>
            <Avatar>S</Avatar>
            <Avatar>S</Avatar>

            <Typography>{getPrice(1)}</Typography>
          </Stack>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  )
}

export default ReceiptListItem

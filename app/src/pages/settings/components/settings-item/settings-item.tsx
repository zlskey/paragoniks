import { CardActionArea, Paper, Stack, Typography } from '@mui/material'

import { SettingsItemProps } from './settings-item.types'

const SettingsItem = ({
  title,
  subtitle,
  icon,
  endComponent,
  onClick,
}: SettingsItemProps) => {
  return (
    <Paper elevation={5}>
      <CardActionArea onClick={onClick} sx={{ p: 1, pl: 2 }}>
        <Stack direction='row' alignItems='center' spacing={2}>
          {icon}

          <Stack flexGrow={1}>
            <Typography variant='subtitle1'>{title}</Typography>

            <Typography variant='subtitle2'>{subtitle}</Typography>
          </Stack>

          {endComponent}
        </Stack>
      </CardActionArea>
    </Paper>
  )
}

export default SettingsItem

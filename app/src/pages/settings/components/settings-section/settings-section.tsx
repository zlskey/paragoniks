import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material'

import { SettingsSectionProps } from './settings-section.types'

const SettingsSection = ({
  children,
  title,
  subtitle,
  icon,
}: SettingsSectionProps) => {
  return (
    <Accordion disableGutters={true}>
      <AccordionSummary>
        <Stack direction='row' alignItems='center' spacing={2}>
          {icon}

          <Stack>
            <Typography variant='h6'>{title}</Typography>
            <Typography>{subtitle}</Typography>
          </Stack>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={1}>{children}</Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default SettingsSection

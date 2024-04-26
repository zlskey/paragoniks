import {
  Container,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

import CloseIcon from '@mui/icons-material/Close'
import { SettingsModalProps } from './settings-modal.types'

const SettingsModal = ({ id, children, title }: SettingsModalProps) => {
  const location = useLocation()

  const navigate = useNavigate()

  const closeModal = () => navigate('#')

  return (
    <Modal open={location.hash === `#${id}`} onClose={closeModal}>
      <Container
        maxWidth='sm'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Paper>
          <Stack p={2} spacing={2}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='h5'>{title}</Typography>

              <IconButton onClick={closeModal}>
                <CloseIcon />
              </IconButton>
            </Stack>

            {children}
          </Stack>
        </Paper>
      </Container>
    </Modal>
  )
}

export default SettingsModal

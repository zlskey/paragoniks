import { Button, ListItem } from '@mui/material'

import LockIcon from '@mui/icons-material/LockOutlined'
import ReadyIcon from '@mui/icons-material/DoneOutlined'
import UnlockIcon from '@mui/icons-material/LockOpenOutlined'

const ContributorStatusButton = () => {
  return (
    <ListItem>
      <Button
        endIcon={true ? <UnlockIcon /> : false ? <ReadyIcon /> : <LockIcon />}
        fullWidth
        variant='contained'
      >
        {true ? 'Unlock receipt' : false ? 'Ready' : 'Lock receipt'}
      </Button>
    </ListItem>
  )
}

export default ContributorStatusButton

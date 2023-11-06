import { MenuItem as MuiMenuItem, Typography } from '@mui/material'

import { MenuItemProps } from './menu-item.types'
import { useNavigate } from 'react-router-dom'

const MenuItem = ({ label, path }: MenuItemProps) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate(path)
  }

  return (
    <MuiMenuItem onClick={handleRedirect}>
      <Typography textAlign='center'>{label}</Typography>
    </MuiMenuItem>
  )
}

export default MenuItem

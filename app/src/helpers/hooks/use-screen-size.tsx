import { useMediaQuery, useTheme } from '@mui/material'

const useScreenSize = () => {
  const theme = useTheme()

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return { isDesktop }
}

export default useScreenSize

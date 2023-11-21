import { ThemeProvider, createTheme } from '@mui/material/styles'

import React from 'react'
import { useUser } from '../contexts/current-user/current-user.context'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const Theme = ({ children }: React.PropsWithChildren) => {
  const user = useUser()

  const theme = user.theme

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme

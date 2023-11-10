import { ThemeProvider, createTheme } from '@mui/material/styles'

import React from 'react'
import { selectUser } from '../reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'

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
  const user = useAppSelector(selectUser)

  const theme = user?.theme || 'dark'

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme

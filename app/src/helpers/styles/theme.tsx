import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const Theme = ({ children }: React.PropsWithChildren) => (
  <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
)

export default Theme

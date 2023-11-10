import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { CssBaseline } from '@mui/material'
import { Provider as ReduxProvider } from 'react-redux'
import { StrictMode } from 'react'
import ThemeProvider from 'src/helpers/styles/theme'
import paths from 'src/helpers/router/paths'
import { store } from 'src/redux-store'

const router = createBrowserRouter(paths)

const App = () => {
  return (
    <StrictMode>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ReduxProvider>
    </StrictMode>
  )
}

export default App

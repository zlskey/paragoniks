import { StrictMode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import paths from 'src/helpers/router/paths'
import ThemeProvider from 'src/helpers/styles/theme'
import { store } from 'src/redux-store'

const router = createBrowserRouter(paths)

const App = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        <ReduxProvider store={store}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ReduxProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

export default App

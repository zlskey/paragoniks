import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { CssBaseline } from '@mui/material'
import CurrentUserContextProvider from './helpers/contexts/current-user/current-user.context'
import LocaleProvider from './helpers/i18n/i18n'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import ThemeProvider from 'src/helpers/styles/theme'
import paths from 'src/helpers/router/paths'

const router = createBrowserRouter(paths)

const queryClient = new QueryClient()

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CurrentUserContextProvider>
          <LocaleProvider>
            <ThemeProvider>
              <CssBaseline />
              <RouterProvider router={router} />
              <ReactQueryDevtools />
            </ThemeProvider>
          </LocaleProvider>
        </CurrentUserContextProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App

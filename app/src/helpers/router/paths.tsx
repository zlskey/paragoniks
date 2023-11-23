import AuthPage from 'src/pages/auth'
import Friends from 'src/pages/friends'
import Home from 'src/pages/home'
import Page404 from 'src/pages/404'
import ProtectedRoute from './protected-route'
import Receipt from 'src/pages/receipt/receipt'
import ReceiptContextProvider from '../contexts/receipt/receipt.context'
import { RouteObject } from 'react-router-dom'
import Settings from 'src/pages/settings/settings'
import WorkInProgress from 'src/pages/work-in-progress/work-in-progress'

const paths: RouteObject[] = [
  {
    path: '/',
    errorElement: <Page404 />,
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'friends',
        element: <Friends />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'receipt/:receiptId',
        element: (
          <ReceiptContextProvider>
            <Receipt />
          </ReceiptContextProvider>
        ),
      },
      {
        path: 'stats',
        element: <WorkInProgress />,
      },
      {
        path: 'profile',
        element: <WorkInProgress />,
      },
    ],
  },
  { path: '/auth', element: <AuthPage /> },
]

export default paths

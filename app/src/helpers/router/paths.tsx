import ProtectedRoute, {
  loader as protectedRouteLoader,
} from './protected-route'

import AuthPage from 'src/pages/auth'
import Friends from 'src/pages/friends'
import Home from 'src/pages/home'
import Page404 from 'src/pages/404'
import Receipt from 'src/pages/receipt/receipt'
import { RouteObject } from 'react-router-dom'
import Settings from 'src/pages/settings/settings'

const paths: RouteObject[] = [
  {
    path: '/',
    errorElement: <Page404 />,
    element: <ProtectedRoute />,
    loader: protectedRouteLoader,
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
        path: 'receipt/:id',
        element: <Receipt />,
      },
    ],
  },
  { path: '/auth', element: <AuthPage /> },
]

export default paths

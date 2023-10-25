import ProtectedRoute, {
  loader as protectedRouteLoader,
} from './protected-route'

import AuthPage from 'src/pages/auth'
import Friends from 'src/pages/friends'
import Home from 'src/pages/home'
import Page404 from 'src/pages/404'

const paths = [
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
    ],
  },
  { path: '/auth', element: <AuthPage /> },
]

export default paths

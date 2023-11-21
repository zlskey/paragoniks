import { Navigate, Outlet } from 'react-router-dom'

import { useIsLoggedIn } from '../contexts/current-user/current-user.context'

const ProtectedRoute = () => {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn) {
    return <Navigate to='/auth' replace />
  }

  return <Outlet />
}

export default ProtectedRoute

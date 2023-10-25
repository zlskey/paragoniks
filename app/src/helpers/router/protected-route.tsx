import { Navigate, Outlet } from 'react-router-dom'

// import { store as reduxStore } from 'src/redux-store'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'

const ProtectedRoute = () => {
  const user = useAppSelector(selectUser)

  if (!user) {
    return <Navigate to='/auth' replace />
  }

  return <Outlet />
}

export const loader = async () => {
  const token = false

  if (!token) {
    return true
  }

  // reduxStore.dispatch(login(user))

  return true
}

export default ProtectedRoute

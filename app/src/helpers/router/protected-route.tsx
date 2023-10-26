import { Navigate, Outlet } from 'react-router-dom'
import { selectUser, setManualy } from '../reducers/user/user.reducer'

import { User } from 'src/types/generic.types'
import { store as reduxStore } from 'src/redux-store'
import { rsApi } from '../services/rs.service'
import { useAppSelector } from 'src/redux-hooks'

const ProtectedRoute = () => {
  const user = useAppSelector(selectUser)

  if (!user) {
    return <Navigate to='/auth' replace />
  }

  return <Outlet />
}

export const loader = async () => {
  const state = reduxStore.getState()

  if (state.user.data) {
    return null
  }

  const { data: user } = await rsApi.get<User | null>('/auth/whoami')

  reduxStore.dispatch(setManualy(user))

  return null
}

export default ProtectedRoute

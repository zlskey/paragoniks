import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from 'react'

import { User } from 'src/types/generic.types'
import { dummyUser } from 'src/helpers/mocks'
import useLocalStorage from '../../hooks/use-local-storage'
import { useQuery } from '@tanstack/react-query'
import { whoamiUser } from 'src/helpers/api/endpoints/user/user.api'

interface CurrentUserContextValue {
  profile: User
  isLoggedIn: boolean
}

export const CurrentUserContext = createContext<CurrentUserContextValue>({
  profile: dummyUser,
  isLoggedIn: false,
})

const CurrentUserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cachedUser, setCachedUser] = useLocalStorage<User | null>('user', null)

  const { data: currentUser } = useQuery({
    queryKey: ['user', 'whoami'],
    queryFn: whoamiUser,
    initialData: cachedUser,
  })

  useEffect(() => {
    setCachedUser(currentUser)
  }, [currentUser])

  return (
    <CurrentUserContext.Provider
      value={{
        profile: currentUser ?? dummyUser,
        isLoggedIn: !!currentUser?._id,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}

const useUser = () => {
  const { profile } = useContext(CurrentUserContext)

  return profile
}

const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(CurrentUserContext)

  return isLoggedIn
}

export { useUser, useIsLoggedIn }
export default CurrentUserContextProvider

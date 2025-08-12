import type { User } from 'src/app/generic.types'
import { createContext, useContext } from 'react'
import { userMockup } from 'src/mockups/user'

interface UserContextState {
  user: User
  loggedIn: boolean
}

const UserContext = createContext<UserContextState>({
  user: userMockup,
  loggedIn: false,
})

const UserContextProvider = UserContext.Provider

const useUserContext = () => useContext(UserContext)

export { UserContext, useUserContext }

export default UserContextProvider

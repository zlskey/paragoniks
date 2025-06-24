import { getUserFriendsOrAnonims } from '@api/endpoints/user/user.api'
import { useQuery } from '@tanstack/react-query'

function useUserFriendsAndAnonims() {
  return useQuery({
    queryKey: ['user', 'friends'],
    queryFn: getUserFriendsOrAnonims,
    initialData: [],
  })
}

export default useUserFriendsAndAnonims

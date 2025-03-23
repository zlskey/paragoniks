import { useMutation, useQueryClient } from '@tanstack/react-query'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { logoutUser } from 'src/api/endpoints/user/user.api'
import { useUserContext } from '@helpers/contexts/user.context'

const useLogoutMutation = () => {
  const user = useUserContext()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['user', 'logout'],
    mutationFn: logoutUser,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user', 'whoami'] })

      queryClient.setQueryData(['user', 'whoami'], null)

      return { previousUser: user }
    },
    onSettled: async () => {
      await AsyncStorage.setItem('token', '')
      await queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
      queryClient.clear()
    },
  })

  return mutate
}

export default useLogoutMutation

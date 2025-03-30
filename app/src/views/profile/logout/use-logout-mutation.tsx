import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useUserContext } from '@helpers/contexts/user.context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutUser } from 'src/api/endpoints/user/user.api'

function useLogoutMutation() {
  const addNotification = useNotificationContext()
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
    onSuccess: () => addNotification('Wylogowano', 'success'),
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })

  return mutate
}

export default useLogoutMutation

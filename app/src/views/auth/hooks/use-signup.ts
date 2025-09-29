import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { saveToStorage } from '@helpers/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { signupUser } from 'src/api/endpoints/user/user.api'

export function useSignup() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: signupUser,
    onSuccess: async (data) => {
      await saveToStorage('token', data.token)
      await queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
      router.push('/home')
      addNotification(`Witamy ${data.user.username}!`, 'success')
    },
    onError: (err: any) => {
      addNotification(err.response.data.error.message ?? SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })
}

import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { saveToStorage } from '@helpers/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from 'src/api/endpoints/user/user.api'

export function useLogin() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: loginUser,
    onSuccess: async (data) => {
      await saveToStorage('token', data.token)
      await queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
      addNotification(`Witaj ponownie ${data.user.username} ❣️`, 'success')
    },
    onError: (err: any) => {
      addNotification(err.response.data.error.message ?? SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })
}

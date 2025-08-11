import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useUserContext } from '@helpers/contexts/user.context'
import { saveToStorage } from '@helpers/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutUser } from 'src/api/endpoints/user/user.api'

function useLogoutMutation() {
  const addNotification = useNotificationContext()
  const user = useUserContext()

  const queryClient = useQueryClient()
  const whoamiQueryKey = ['user', 'whoami']

  const { mutate } = useMutation({
    mutationKey: ['user', 'logout'],
    mutationFn: logoutUser,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: whoamiQueryKey })
      await queryClient.invalidateQueries({ queryKey: whoamiQueryKey })

      return { previousUser: user }
    },
    onSettled: async () => {
      await saveToStorage('token', '')
      await queryClient.invalidateQueries({ queryKey: whoamiQueryKey })
      queryClient.clear()
    },
    onSuccess: () => addNotification('Wylogowano', 'success'),
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })

  return mutate
}

export default useLogoutMutation

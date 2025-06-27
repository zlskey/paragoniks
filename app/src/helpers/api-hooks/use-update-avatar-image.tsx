import type { WhoamiUserResponse } from 'src/api/endpoints/user/user.api.types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeAvatarImage } from 'src/api/endpoints/user/user.api'

function useUpdateAvatarImage() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['user', 'avatar', 'image'],
    mutationFn: changeAvatarImage,
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
    onSuccess: (updatedUser) => {
      if (!updatedUser) {
        return
      }

      addNotification('Avatar zaktualizowany', 'success')
      queryClient.setQueryData(
        ['user', 'whoami'],
        (prev: WhoamiUserResponse[]) => ({ ...prev, updatedUser }),
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
    },
  })
}

export default useUpdateAvatarImage

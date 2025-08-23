import type { UserMeta } from '@types'
import { updateUserMeta } from '@api/endpoints/user/user.api'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function useUpdateUserMeta() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['user', 'meta', 'update'],
    mutationFn: (meta: UserMeta) => updateUserMeta({ meta }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
    },
    onSuccess: (data, meta) => {
      queryClient.setQueryData(
        ['user', 'whoami'],
        { ...data, meta: { ...data.meta, ...meta } },
      )
    },
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })
}

export default useUpdateUserMeta

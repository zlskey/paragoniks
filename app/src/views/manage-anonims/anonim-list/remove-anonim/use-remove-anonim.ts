import type { Anonim } from '@types'
import { removeAnonim } from '@api/endpoints/anonim/anonim.api'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function useRemoveAnonim() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()

  const mutationKey = ['anonim', 'remove']
  const queryKey = ['anonims', 'all']

  const { mutate: handleRemoveAnonim } = useMutation({
    mutationKey,
    mutationFn: removeAnonim,
    onMutate: async ({ username }) => {
      await queryClient.cancelQueries({ queryKey })

      const oldAnonim = queryClient.getQueryData<Anonim[]>(queryKey)

      queryClient.setQueryData(queryKey, (old: Anonim[]) =>
        old.filter(anonim => anonim.username !== username))

      return { oldAnonim }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onSuccess: (_, { username }) => addNotification(`Anonim ${username} usunięty`, 'success'),
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })

  return handleRemoveAnonim
}

export default useRemoveAnonim

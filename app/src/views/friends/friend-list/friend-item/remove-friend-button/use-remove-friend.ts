import type { Friendship } from '@types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeFriend } from 'src/api/endpoints/friends/friends.api'

function useRemoveFriend() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()

  const mutationKey = ['friend']
  const queryKey = ['friend']

  const { mutate: handleRemoveFriend } = useMutation({
    mutationKey,
    mutationFn: removeFriend,
    onMutate: async ({ friendId }) => {
      await queryClient.cancelQueries({ queryKey })

      const oldFriendships = queryClient.getQueryData<Friendship[]>(queryKey)

      queryClient.setQueryData(queryKey, (old: Friendship[]) =>
        old.filter(friendship => friendship.friendId !== friendId))

      return { oldFriendships }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onSuccess: () => addNotification('Znajomy usunięty', 'success'),
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })

  return handleRemoveFriend
}

export default useRemoveFriend

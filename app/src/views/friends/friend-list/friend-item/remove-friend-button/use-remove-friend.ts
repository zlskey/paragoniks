import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Friendship } from 'src/app/generic.types'
import { removeFriend } from 'src/api/endpoints/friends/friends.api'
import { useNotificationContext } from '@helpers/contexts/notification.context'

const useRemoveFriend = () => {
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
        old.filter(friendship => friendship.friendId !== friendId)
      )

      return { oldFriendships }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onSuccess: () => addNotification('Znajomy usunięty', 'success'),
    onError: () =>
      addNotification('Wystąpił błąd, spróbuj ponownie później', 'error'),
  })

  return handleRemoveFriend
}

export default useRemoveFriend

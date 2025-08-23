import type { Friendship, UserId } from '@paragoniks/shared'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { respondToFriendRequest } from 'src/api/endpoints/friends/friends.api'

function useDeclineFriendRequest() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()
  const queryKey = ['friend']

  const { mutate } = useMutation({
    mutationKey: ['friend', 'respond'],
    mutationFn: ({ friendId }: { friendId: UserId }) =>
      respondToFriendRequest({ friendId, accept: false }),
    onMutate: async ({ friendId }) => {
      await queryClient.cancelQueries({ queryKey })

      const oldFriendships = queryClient.getQueryData<Friendship[]>(queryKey)

      queryClient.setQueryData(queryKey, (old: Friendship[]) =>
        old.filter(friendship => friendship.friendId !== friendId))

      return { oldFriendships }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })

  return mutate
}

export default useDeclineFriendRequest

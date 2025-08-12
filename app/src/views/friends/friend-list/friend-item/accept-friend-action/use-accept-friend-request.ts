import type { Friendship, UserId } from 'src/app/generic.types'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { respondToFriendRequest } from 'src/api/endpoints/friends/friends.api'

function useAcceptFriendRequest() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()

  const queryKey = ['friend']

  const { mutate } = useMutation({
    mutationKey: ['friend', 'respond'],
    mutationFn: ({ friendId }: { friendId: UserId }) =>
      respondToFriendRequest({ friendId, accept: true }),
    onMutate: async ({ friendId }) => {
      await queryClient.cancelQueries({ queryKey })

      const oldFriendships = queryClient.getQueryData<Friendship[]>(queryKey)

      queryClient.setQueryData(queryKey, (old: Friendship[]) =>
        old.map((friendship) => {
          if (friendship.friendId === friendId) {
            return {
              ...friendship,
              status: 'accepted',
            }
          }

          return friendship
        }))

      return { oldFriendships }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
    onError: () => addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error'),
  })

  return mutate
}

export default useAcceptFriendRequest

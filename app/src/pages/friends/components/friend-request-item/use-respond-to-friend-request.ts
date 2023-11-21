import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Friendship } from 'src/types/generic.types'
import { respondToFriendRequest } from 'src/helpers/services/endpoints/friends/friends.service'

const useRespondToFriendRequest = () => {
  const queryClient = useQueryClient()

  const queryKey = ['friend']

  const { mutate } = useMutation({
    mutationKey: ['friend', 'respond'],
    mutationFn: respondToFriendRequest,
    onMutate: async ({ friendId, accept }) => {
      await queryClient.cancelQueries({ queryKey })

      const oldFriendships = queryClient.getQueryData<Friendship[]>(queryKey)

      queryClient.setQueryData(queryKey, (old: Friendship[]) => {
        if (accept) {
          return old.map(friendship => {
            if (friendship.friendId === friendId) {
              return {
                ...friendship,
                status: 'accepted',
              }
            }

            return friendship
          })
        }

        return old.filter(friendship => friendship.friendId !== friendId)
      })

      return { oldFriendships }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return mutate
}

export default useRespondToFriendRequest

import { Friendship, UserId } from 'src/app/generic.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { respondToFriendRequest } from 'src/api/endpoints/friends/friends.api'

const useDeclineFriendRequest = () => {
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
        old.filter(friendship => friendship.friendId !== friendId)
      )

      return { oldFriendships }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return mutate
}

export default useDeclineFriendRequest

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Friendship } from 'src/types/generic.types'
import { removeFriend } from 'src/helpers/api/endpoints/friends/friends.api'

const useRemoveFriend = () => {
  const queryClient = useQueryClient()

  const mutationKey = ['friend']
  const queryKey = ['friend']

  const { mutate: handleRemoveFriend } = useMutation({
    mutationKey,
    mutationFn: removeFriend,
    // optimistic update
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

  return handleRemoveFriend
}

export default useRemoveFriend

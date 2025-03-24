import type { WhoamiUserResponse } from 'src/api/endpoints/user/user.api.types'

import type { ImageBase64 } from 'src/app/generic.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeAvatarImage } from 'src/api/endpoints/user/user.api'

function useUpdateAvatarImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['user', 'avatar', 'image'],
    mutationFn: async (image: ImageBase64) => changeAvatarImage({ image }),
    onError: () => {},
    onSuccess: (updatedUser) => {
      if (!updatedUser) {
        return
      }

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

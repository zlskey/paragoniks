import type { Anonim } from '@app/generic.types'

import { removeAnonim } from '@api/endpoints/anonim/anonim.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function useRemoveAnonim() {
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
  })

  return handleRemoveAnonim
}

export default useRemoveAnonim

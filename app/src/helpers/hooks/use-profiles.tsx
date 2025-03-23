import { UserId } from 'src/app/generic.types'
import { getProfile } from 'src/api/endpoints/profiles/profiles.api'
import { useQueries } from '@tanstack/react-query'

function useProfiles(profilesIds: UserId[]) {
  const results = useQueries({
    queries: profilesIds.map(profileId => ({
      queryKey: ['user', 'profile', profileId],
      queryFn: () => getProfile({ userId: profileId }),
    })),
  })

  const profiles = results
    .flatMap(result => result.data || [])
    .sort((a, b) => a.username.localeCompare(b.username))

  const isLoading = results.some(result => result.isLoading)

  return { profiles, isLoading }
}

export default useProfiles

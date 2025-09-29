import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { validationService } from 'src/api'

function useIsUsernameTaken(username: string, debounceMs: number = 500) {
  const [debouncedUsername, setDebouncedUsername] = useState(username)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(username)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [username, debounceMs])

  return useQuery({
    queryKey: ['auth', 'is-username-taken', debouncedUsername],
    queryFn: () => validationService.isUsernameTaken({ username: debouncedUsername }),
    enabled: debouncedUsername.length > 0,
    refetchOnWindowFocus: false,
  })
}

export default useIsUsernameTaken

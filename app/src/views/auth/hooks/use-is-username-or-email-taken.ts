import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { validationService } from 'src/api'

const FIVE_MINUTES = 5 * 60 * 1000

function useIsUsernameTakenOrEmailTaken(usernameOrEmail: string, excludeGoogleAccount = false, debounceMs: number = 500) {
  const [debouncedUsernameOrEmail, setDebouncedUsernameOrEmail] = useState(usernameOrEmail)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsernameOrEmail(usernameOrEmail)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [usernameOrEmail, debounceMs])

  return useQuery({
    queryKey: ['auth', 'is-username-or-email-taken', debouncedUsernameOrEmail],
    queryFn: () => validationService.isUsernameOrEmailTaken({ usernameOrEmail: debouncedUsernameOrEmail, excludeGoogleAccount }),
    enabled: debouncedUsernameOrEmail.length > 0,
    staleTime: FIVE_MINUTES,
    gcTime: FIVE_MINUTES,
    refetchOnWindowFocus: false,
  })
}

export default useIsUsernameTakenOrEmailTaken

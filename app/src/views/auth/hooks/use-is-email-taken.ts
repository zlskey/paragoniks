import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { validationService } from 'src/api'

function useIsEmailTaken(
  email: string,
  excludeGoogleAccount = false,
  debounceMs: number = 500,
) {
  const [debouncedEmail, setDebouncedEmail] = useState(email)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedEmail(email)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [email, debounceMs])

  return useQuery({
    queryKey: ['auth', 'is-email-taken', debouncedEmail, excludeGoogleAccount],
    queryFn: () => validationService.isEmailTaken({ email: debouncedEmail, excludeGoogleAccount }),
    enabled: debouncedEmail.length > 0,
    refetchOnWindowFocus: false,
  })
}

export default useIsEmailTaken

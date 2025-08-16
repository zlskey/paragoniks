import { router } from 'expo-router'
import { useCallback } from 'react'

export function useAuthNavigation() {
  const navigateToLogin = useCallback(() => {
    router.push('/a/login')
  }, [])

  const navigateToSignup = useCallback(() => {
    router.push('/a/signup')
  }, [])

  const navigateToPasswordRecovery = useCallback(() => {
    router.replace('/a/password-recovery')
  }, [])

  const navigateToLoginPassword = useCallback((username: string) => {
    router.push({
      pathname: '/a/login/password',
      params: { username },
    })
  }, [])

  const navigateToSignupPassword = useCallback((username: string) => {
    router.push({
      pathname: '/a/signup/password',
      params: { username },
    })
  }, [])

  const navigateToSignupProfile = useCallback((username: string, password: string) => {
    router.push({
      pathname: '/a/signup/profile',
      params: { username, password },
    })
  }, [])

  const navigateToPasswordRecoveryCode = useCallback(() => {
    router.push('/a/password-recovery/code')
  }, [])

  const navigateToNewPassword = useCallback(() => {
    router.replace('/a/password-recovery/new-password')
  }, [])

  const navigateToLoginFromPasswordReset = useCallback(() => {
    router.replace('/a/login')
  }, [])

  return {
    navigateToLogin,
    navigateToSignup,
    navigateToPasswordRecovery,
    navigateToLoginPassword,
    navigateToSignupPassword,
    navigateToSignupProfile,
    navigateToPasswordRecoveryCode,
    navigateToNewPassword,
    navigateToLoginFromPasswordReset,
  }
}

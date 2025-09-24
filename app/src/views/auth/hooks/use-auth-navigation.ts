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
    router.replace({ pathname: '/a/password-recovery' })
  }, [])

  const navigateToLoginPassword = useCallback((usernameOrEmail: string) => {
    router.push({
      pathname: '/a/login/password',
      params: { usernameOrEmail },
    })
  }, [])

  const navigateToSignupPassword = useCallback((username: string, email?: string) => {
    router.push({
      pathname: '/a/signup/password',
      params: { username, email },
    })
  }, [])

  const navigateToSignupEmail = useCallback((username: string) => {
    router.push({
      pathname: '/a/signup/email',
      params: { username },
    })
  }, [])

  const navigateToSignupProfile = useCallback((username: string, password: string, email: string | undefined) => {
    router.push({
      pathname: '/a/signup/profile',
      params: { username, password, email },
    })
  }, [])

  const navigateToPasswordRecoveryCode = useCallback((userId: string, usernameOrEmail: string) => {
    router.push({
      pathname: '/a/password-recovery/password-recovery-code',
      params: { userId, usernameOrEmail },
    })
  }, [])

  const navigateToNewPassword = useCallback(() => {
    router.replace('/a/password-recovery/new-password')
  }, [])

  return {
    navigateToLogin,
    navigateToSignup,
    navigateToPasswordRecovery,
    navigateToLoginPassword,
    navigateToSignupPassword,
    navigateToSignupEmail,
    navigateToSignupProfile,
    navigateToPasswordRecoveryCode,
    navigateToNewPassword,
  }
}

function useEmailOrUsername(usernameOrEmail: string): 'email' | 'username' {
  if (usernameOrEmail.includes('@')) {
    return 'email'
  }

  return 'username'
}

export default useEmailOrUsername

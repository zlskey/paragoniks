const isProdEnv = process.env.NODE_ENV === 'production'

export function getCredentials() {
  if (!isProdEnv) {
    return undefined
  }

  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not set')
  }

  return JSON.parse(credentials)
}

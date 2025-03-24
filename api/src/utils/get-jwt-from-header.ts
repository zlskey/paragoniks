export function getJwtFromHeader(header: string) {
  if (!header) {
    return null
  }

  const [type, token] = header.split(' ')

  if (type !== 'Bearer') {
    return null
  }

  return token
}

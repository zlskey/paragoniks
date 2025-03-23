export function getQueryInterval(interval: number) {
  if (process.env.NODE_ENV === 'development') {
    return false
  }

  return interval
}

import { RsApiError } from '../generic.types'

const isRsApiError = (data: any): data is RsApiError => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'code' in data &&
    'message' in data
  )
}

export default isRsApiError

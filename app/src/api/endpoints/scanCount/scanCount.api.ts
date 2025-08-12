import type { IScanCountResponse } from './scanCount.api.types'
import { getRsApi } from '@api/rs.api'

export async function getScanCount() {
  const rsApi = await getRsApi()
  const response = await rsApi.get<IScanCountResponse>('/scanCount')
  return response.data
}

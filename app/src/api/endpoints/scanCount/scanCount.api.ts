import type { IScanCountModelResponse } from './scanCount.api.types'
import { getRsApi } from '@api/rs.api'

export async function getScanCount() {
  const rsApi = await getRsApi()
  const response = await rsApi.get<IScanCountModelResponse>('/scanCount')
  return response.data
}

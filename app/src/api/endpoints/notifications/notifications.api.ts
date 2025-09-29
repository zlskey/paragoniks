import type { RegisterPushTokenBody } from './notifications.api.types'
import { getRsApi } from '@api/rs.api'

export async function registerPushToken(body: RegisterPushTokenBody) {
  const url = 'notifications/token'
  const rsApi = await getRsApi()
  const response = await rsApi.post(url, body)
  return response.data
}

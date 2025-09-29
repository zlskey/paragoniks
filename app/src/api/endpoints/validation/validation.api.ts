import type {
  IsEmailTakenBody,
  IsUsernameOrEmailTakenBody,
  IsUsernameTakenBody,
} from './validation.api.types'
import { getRsApi } from '@api/rs.api'

export async function isUsernameTaken(body: IsUsernameTakenBody) {
  const url = 'validation/is-username-taken'
  const rsApi = await getRsApi()
  const response = await rsApi.post<boolean>(url, body)

  return response.data === true
}

export async function isEmailTaken(body: IsEmailTakenBody) {
  const url = 'validation/is-email-taken'
  const rsApi = await getRsApi()
  const response = await rsApi.post<boolean>(url, body)

  return response.data === true
}

export async function isUsernameOrEmailTaken(body: IsUsernameOrEmailTakenBody) {
  const url = 'validation/is-username-or-email-taken'
  const rsApi = await getRsApi()
  const response = await rsApi.post<boolean>(url, body)

  return response.data === true
}

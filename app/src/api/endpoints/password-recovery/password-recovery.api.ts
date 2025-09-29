import type { LoginUserResponse } from '../user/user.api.types'
import type {
  PasswordRecoveryCodeBody,
  SendPasswordRecoveryEmailBody,
  SendPasswordRecoveryEmailResponse,
  UpdatePasswordBody,
} from './password-recovery.api.types'
import { getRsApi } from '@api/rs.api'

export async function sendPasswordRecoveryEmail(body: SendPasswordRecoveryEmailBody) {
  const url = 'password-recovery/send-email'
  const rsApi = await getRsApi()
  const response = await rsApi.post<SendPasswordRecoveryEmailResponse>(url, body, {
    timeout: 100000,
  })

  return response.data
}

export async function passwordRecoveryCode(body: PasswordRecoveryCodeBody) {
  const url = 'password-recovery/verify-code'
  const rsApi = await getRsApi()
  const response = await rsApi.post<LoginUserResponse>(url, body)

  return response.data
}

export async function updatePassword(body: UpdatePasswordBody) {
  const url = 'password-recovery/update-password'
  const rsApi = await getRsApi()
  const response = await rsApi.post(url, body)

  return response.data
}

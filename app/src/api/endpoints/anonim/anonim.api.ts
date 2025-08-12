import type { Anonim } from '@app/generic.types'
import type { CreateAnonimBody, RemoveAnonimBody } from './anonim.api.types'
import { getRsApi } from '@api/rs.api'

export async function createAnonim(body: CreateAnonimBody) {
  const url = 'anonim'
  const rsApi = await getRsApi()
  const response = await rsApi.post(url, body)

  return response.data
}

export async function getAllAnonims() {
  const url = 'anonim'
  const rsApi = await getRsApi()
  const response = await rsApi.get<Anonim[]>(url)

  return response.data
}

export async function removeAnonim(body: RemoveAnonimBody) {
  const url = `anonim`
  const rsApi = await getRsApi()
  const response = await rsApi.delete(url, { data: body })

  return response.data
}

import { getFromStorage, isWebOnDesktop } from '@helpers/utils/storage'
import axios from 'axios'

async function getRsApi() {
  const token = await getFromStorage('token')

  const defaultOptions = {
    baseURL: process.env.EXPO_PUBLIC_RS_API_URL,
    timeout: 3000,
  }

  const webOptions = {
    ...defaultOptions,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }

  const appOptions = {
    ...defaultOptions,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }

  const rsApi = axios.create(isWebOnDesktop() ? webOptions : appOptions)

  return rsApi
}

export { getRsApi }

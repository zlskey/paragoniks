import { getFromStorage } from '@helpers/utils/storage'
import axios from 'axios'
import { Platform } from 'react-native'

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

  return axios.create(Platform.OS === 'web' ? webOptions : appOptions)
}

export { getRsApi }

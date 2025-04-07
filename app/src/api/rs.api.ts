import { getFromStorage } from '@helpers/utils/storage'
import axios from 'axios'

async function getRsApi() {
  const token = await getFromStorage('token')

  const rsApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_RS_API_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true,
  })

  return rsApi
}

export { getRsApi }

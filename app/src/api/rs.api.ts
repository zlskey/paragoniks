import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const getRsApi = async () => {
  const token = await AsyncStorage.getItem('token')

  const rsApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_RS_API_URL,
    timeout: 3000,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return rsApi
}

export { getRsApi }

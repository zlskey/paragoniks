import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import config from 'src/config'

const isWeb = Platform.OS === 'web'

export function isWebOnDesktop() {
  if (!config.IS_PRODUCTION) {
    return false
  }

  const isDesktopUserAgent = /Windows|Macintosh/.test(navigator.userAgent)

  return isWeb && isDesktopUserAgent
};

export function saveToStorage(key: string, data: unknown) {
  if (isWeb) {
    return localStorage.setItem(key, JSON.stringify(data))
  }
  return AsyncStorage.setItem('token', JSON.stringify(data))
}

export async function getFromStorage(key: string) {
  try {
    if (isWeb) {
      const val = localStorage.getItem(key) ?? ''
      return JSON.parse(val)
    }

    const val = await AsyncStorage.getItem('token') ?? ''
    return JSON.parse(val)
  }
  catch (error) {
    console.error('Error getting data from storage:', error)
    return ''
  }
}

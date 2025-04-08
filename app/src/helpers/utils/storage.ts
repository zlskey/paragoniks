import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

const isWeb = Platform.OS === 'web'

export function isWebOnDesktop() {
  if (process.env.NODE_ENV === 'development') {
    return false
  }

  const isDesktopUserAgent = /Windows|Macintosh/.test(navigator.userAgent)

  return isWeb && isDesktopUserAgent
};

export function saveToStorage(key: string, data: unknown) {
  return isWeb ? localStorage.setItem(key, JSON.stringify(data)) : AsyncStorage.setItem('token', '')
}

export function getFromStorage(key: string) {
  if (isWeb) {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : val
  }
  return AsyncStorage.getItem('token')
}

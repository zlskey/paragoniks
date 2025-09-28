import { getRsApi } from '@api/rs.api'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { notificationService } from '../services/notification.service'

export function useNotifications() {
  const addNotification = useNotificationContext()
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
  const [notification, setNotification] = useState<Notifications.Notification | null>(null)

  useEffect(() => {
    registerForPushNotificationsAsync()

    // Set up notification listeners
    notificationService.setupNotificationListeners()

    // Create notification channels for Android
    notificationService.createNotificationChannels()

    // Listen for notifications received while app is running
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
    })

    // Listen for notification taps
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification tapped:', response)
      // Handle navigation based on notification data
      const data = response.notification.request.content.data
      if (data?.screen) {
        // Navigate to specific screen based on notification data
        console.log('Navigate to:', data.screen)
      }
    })

    return () => {
      responseListener.remove()
      notificationListener.remove()
    }
  }, [])

  async function registerForPushNotificationsAsync() {
    let token

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        addNotification('Failed to get push token for push notification!', 'error')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })).data
      console.log('Expo push token:', token)
    }
    else {
      addNotification('Must use physical device for Push Notifications', 'error')
    }

    if (token) {
      setExpoPushToken(token)
      // Register the token with your backend
      try {
        const rsApi = await getRsApi()
        await rsApi.post('/notification/register-token', { pushToken: token })
        console.log('Push token registered with backend')
      }
      catch (error) {
        console.error('Failed to register push token:', error)
      }
    }

    return token
  }

  const sendTestNotification = async () => {
    try {
      const rsApi = await getRsApi()
      await rsApi.post('/notification/test')
      console.log('Test notification sent')
    }
    catch (error) {
      console.error('Failed to send test notification:', error)
    }
  }

  const scheduleLocalNotification = async (title: string, body: string, data?: Record<string, any>) => {
    return await notificationService.scheduleLocalNotification({
      title,
      body,
      data,
    })
  }

  return {
    expoPushToken,
    notification,
    sendTestNotification,
    scheduleLocalNotification,
  }
}

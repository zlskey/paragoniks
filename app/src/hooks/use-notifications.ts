import { useMutation } from '@tanstack/react-query'
import * as Device from 'expo-device'
import { useEffect } from 'react'
import { notificationsService } from 'src/api'
import { notificationService } from 'src/services/notification.service'

export function useNotifications() {
  const { mutate } = useMutation({
    mutationFn: notificationsService.registerPushToken,
    onError: () => {
      // Send error to Sentry
    },
  })

  useEffect(() => {
    registerForPushNotificationsAsync()

    // Set up notification listeners
    notificationService.setupNotificationListeners()

    // Create notification channels for Android
    notificationService.createNotificationChannels()

    // Remove notification listeners on unmount
    return () => notificationService.removeNotificationListeners()
  }, [])

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      return
    }

    const expoPushToken = await notificationService.getExpoPushToken()

    mutate({ notificationsToken: expoPushToken })
  }
}

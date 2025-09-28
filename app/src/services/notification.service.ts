import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export interface NotificationData {
  title: string
  body: string
  data?: Record<string, any>
}

export class NotificationService {
  private static instance: NotificationService
  private pushToken: string | null = null

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  /**
   * Register for push notifications and get the Expo push token
   */
  async registerForPushNotifications(): Promise<string | null> {
    if (!Device.isDevice) {
      console.log('Must use physical device for Push Notifications')
      return null
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!')
      return null
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })

      this.pushToken = token.data
      console.log('Expo push token:', this.pushToken)
      return this.pushToken
    }
    catch (error) {
      console.error('Error getting push token:', error)
      return null
    }
  }

  /**
   * Get the current push token
   */
  getPushToken(): string | null {
    return this.pushToken
  }

  /**
   * Schedule a local notification
   */
  async scheduleLocalNotification(notification: NotificationData): Promise<string> {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
        data: notification.data || {},
      },
      trigger: null, // Show immediately
    })
  }

  /**
   * Schedule a notification with a delay
   */
  async scheduleDelayedNotification(
    notification: NotificationData,
    seconds: number,
  ): Promise<string> {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
        data: notification.data || {},
      },
      trigger: { seconds, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL },
    })
  }

  /**
   * Cancel a specific notification
   */
  async cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId)
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  /**
   * Set up notification listeners
   */
  setupNotificationListeners() {
    // Handle notifications received while app is running
    Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification)
    })

    // Handle notification taps
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification tapped:', response)
      // Handle navigation based on notification data
      const data = response.notification.request.content.data
      if (data?.screen) {
        // Navigate to specific screen
        console.log('Navigate to:', data.screen)
      }
    })
  }

  /**
   * Create notification channels for Android
   */
  async createNotificationChannels() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })

      await Notifications.setNotificationChannelAsync('shopping-updates', {
        name: 'Shopping Updates',
        description: 'Notifications about shopping list updates',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
      })
    }
  }
}

export const notificationService = NotificationService.getInstance()

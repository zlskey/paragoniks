import type { NotificationPermissionsStatus } from 'expo-notifications'
import Constants from 'expo-constants'
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
  private permissionStatus: NotificationPermissionsStatus['status'] | null = null
  private notificationReceivedListener: Notifications.EventSubscription | null = null
  private notificationResponseReceivedListener: Notifications.EventSubscription | null = null

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async getExpoPermissionStatus() {
    const { status } = await Notifications.getPermissionsAsync()
    if (status === 'granted') {
      this.permissionStatus = status
      return status
    }
    const { status: newStatus } = await Notifications.requestPermissionsAsync()
    this.permissionStatus = newStatus
    return newStatus
  }

  async getExpoPushToken() {
    if (this.permissionStatus === null) {
      await this.getExpoPermissionStatus()
    }

    if (this.permissionStatus !== 'granted') {
      return null
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    })
    this.pushToken = token.data

    return token.data
  }

  /**
   * Get the current push token
   */
  getPushToken() {
    return this.pushToken
  }

  /**
   * Get the current permission status
   */
  getPermissionStatus() {
    return this.permissionStatus
  }

  /**
   * Schedule a local notification
   */
  async sendInstantNotification(notification: NotificationData) {
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
  ) {
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
  async cancelNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId)
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  /**
   * Set up notification listeners
   */
  setupNotificationListeners() {
    // Handle notifications received while app is running
    this.notificationReceivedListener = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification)
    })

    // Handle notification taps
    this.notificationResponseReceivedListener = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data
      if (data?.screen) {
        // Navigate to specific screen
        console.log('Navigate to:', data.screen)
      }
    })
  }

  /**
   * Remove notification listeners
   */
  removeNotificationListeners() {
    this.notificationReceivedListener?.remove()
    this.notificationResponseReceivedListener?.remove()
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

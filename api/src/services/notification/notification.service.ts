// Using built-in fetch (Node.js 18+) or node-fetch for older versions

interface PushNotificationPayload {
  to: string
  title: string
  body: string
  data?: Record<string, any>
  sound?: 'default' | null
  badge?: number
}

/**
 * Send push notification using Expo's push notification service
 */
export async function sendPushNotification(payload: PushNotificationPayload) {
  const message = {
    to: payload.to,
    sound: payload.sound || 'default',
    title: payload.title,
    body: payload.body,
    data: payload.data || {},
    badge: payload.badge,
  }

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`Expo push notification failed: ${JSON.stringify(result)}`)
    }

    return result
  }
  catch (error) {
    console.error('Error sending push notification:', error)
    throw error
  }
}

/**
 * Send push notification to multiple tokens
 */
export async function sendPushNotificationToMultiple(
  tokens: string[],
  title: string,
  body: string,
  data?: Record<string, any>,
) {
  const messages = tokens.map(token => ({
    to: token,
    sound: 'default' as const,
    title,
    body,
    data: data || {},
  }))

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`Expo push notification failed: ${JSON.stringify(result)}`)
    }

    return result
  }
  catch (error) {
    console.error('Error sending push notifications:', error)
    throw error
  }
}

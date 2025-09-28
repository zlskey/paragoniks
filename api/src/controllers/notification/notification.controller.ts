import type { RequestHandler } from 'express'
import { userService } from 'src/services'
import { notificationService } from 'src/services/notification'

export const handleRegisterPushToken: RequestHandler = async (req, res) => {
  const { pushToken } = req.body
  const user = req.user

  if (!pushToken) {
    res.status(400).json({ error: 'Push token is required' })
    return
  }

  try {
    await userService.update(user._id, { pushToken })
    res.status(200).json({ success: true })
  }
  catch (error) {
    console.error('Error registering push token:', error)
    res.status(500).json({ error: 'Failed to register push token' })
  }
}

export const handleSendTestNotification: RequestHandler = async (req, res) => {
  const user = req.user

  if (!user.pushToken) {
    res.status(400).json({ error: 'User has no push token registered' })
    return
  }

  try {
    await notificationService.sendPushNotification({
      to: user.pushToken,
      title: 'Test Notification',
      body: 'This is a test notification from Paragoniks!',
      data: { screen: 'home' },
    })

    res.status(200).json({ success: true })
  }
  catch (error) {
    console.error('Error sending test notification:', error)
    res.status(500).json({ error: 'Failed to send notification' })
  }
}

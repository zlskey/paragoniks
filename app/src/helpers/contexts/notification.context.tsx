import type { PropsWithChildren } from 'react'
import Typography from '@components/typography'
import { createContext, useContext, useState } from 'react'
import { Snackbar, useTheme } from 'react-native-paper'

interface Notification {
  message: string
  type: 'success' | 'error' | 'info'
}

type AddNotification = (
  message: Notification['message'],
  type?: Notification['type']
) => void

const NotificationContext = createContext<AddNotification>(() => {})

function NotificationWrapper({ children }: PropsWithChildren) {
  const theme = useTheme()
  const [notifications, setNotifications] = useState<Notification[]>([])

  function addNotification(
    message: Notification['message'],
    type: Notification['type'] = 'info',
  ) {
    setNotifications([...notifications, { message, type }])
  }

  function removeFirstNotification() {
    setNotifications(prev => prev.slice(1))
  }

  function getBackgroundColor() {
    switch (notifications[0]?.type) {
      case 'success':
        return '#2e7d32'
      case 'error':
        return '#b71c1c'
      case 'info':
        return '#1976d2'
    }
  }

  return (
    <NotificationContext.Provider value={addNotification}>
      {children}

      <Snackbar
        style={{ backgroundColor: getBackgroundColor() }}
        duration={3000}
        action={{
          label: 'Zamknij',
          labelStyle: { color: theme.colors.onSurface },
          onPress: removeFirstNotification,
        }}
        theme={theme}
        visible={!!notifications[0]}
        onDismiss={removeFirstNotification}
      >
        <Typography variant="subtitle2" styles={{ color: theme.colors.onSurface }}>
          {notifications[0]?.message}
        </Typography>
      </Snackbar>
    </NotificationContext.Provider>
  )
}

const useNotificationContext = () => useContext(NotificationContext)

export { NotificationContext, useNotificationContext }

export default NotificationWrapper

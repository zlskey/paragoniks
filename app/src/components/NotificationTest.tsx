import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNotifications } from '../hooks/useNotifications'

export function NotificationTest() {
  const { expoPushToken, sendTestNotification, scheduleLocalNotification } = useNotifications()

  const handleSendTest = () => {
    sendTestNotification()
  }

  const handleScheduleLocal = () => {
    scheduleLocalNotification(
      'Local Notification',
      'This is a local notification from Paragoniks!',
      { screen: 'home' },
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notifications Test</Text>

      <Text style={styles.token}>
        Push Token:
        {' '}
        {expoPushToken ? 'Registered ✅' : 'Not registered ❌'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSendTest}>
        <Text style={styles.buttonText}>Send Test Push Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleScheduleLocal}>
        <Text style={styles.buttonText}>Schedule Local Notification</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  token: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

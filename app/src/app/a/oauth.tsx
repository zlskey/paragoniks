import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useGoogleAuth } from 'src/hooks/use-google-auth'

export function OAuthDebugger() {
  const { testOAuthConfig, onGooglePress, isGooglePending } = useGoogleAuth()

  const handleTestConfig = () => {
    console.log('=== OAuth Configuration Test ===')
    const result = testOAuthConfig()
    console.log('Test result:', result)
  }

  const handleTestAuth = () => {
    console.log('=== Testing OAuth Flow ===')
    onGooglePress()
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>OAuth Configuration Debugger</Text>

      <TouchableOpacity style={styles.button} onPress={handleTestConfig}>
        <Text style={styles.buttonText}>Test OAuth Configuration</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isGooglePending && styles.buttonDisabled]}
        onPress={handleTestAuth}
        disabled={isGooglePending}
      >
        <Text style={styles.buttonText}>
          {isGooglePending ? 'Testing OAuth...' : 'Test OAuth Flow'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        Check your console for detailed OAuth configuration information.
        This will help you verify your Google Cloud Console setup.
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  instructions: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
})

// File: App.js

import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate a network request or some asynchronous task
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // time in milliseconds

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      {loading
        ? (
            <ActivityIndicator size="large" color="#00ff00" />
          )
        : (
            <Text style={styles.text}>Content has loaded!</Text>
          )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 18,
    color: '#333333',
  },
})

export default App

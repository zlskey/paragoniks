import { Stack } from 'expo-router'

export default () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="change-title" options={{ headerShown: false }} />
      <Stack.Screen name="add-contributors" options={{ headerShown: false }} />
      <Stack.Screen name="[productId]" options={{ headerShown: false }} />
    </Stack>
  )
}

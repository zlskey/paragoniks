import { Stack } from 'expo-router'

function NewPasswordLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}

export default NewPasswordLayout

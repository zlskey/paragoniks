import AuthHeader from '@components/auth-header'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ header: () => <AuthHeader /> }}
      />
      <Stack.Screen
        name="signup"
        options={{ header: () => <AuthHeader /> }}
      />
      <Stack.Screen
        name="password-recovery"
        options={{ header: () => <AuthHeader /> }}
      />
    </Stack>
  )
}

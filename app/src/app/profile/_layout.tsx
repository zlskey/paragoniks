import StackHeader from '@components/stack-header'
import { Stack } from 'expo-router'

export default () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        header: () => <StackHeader title="Profil" />,
      }}
    />

    <Stack.Screen
      name="change-username"
      options={{
        header: () => <StackHeader title="Zmień nazwę" />,
      }}
    />

    <Stack.Screen
      name="change-password"
      options={{
        header: () => <StackHeader title="Zmień hasło" />,
      }}
    />
  </Stack>
)

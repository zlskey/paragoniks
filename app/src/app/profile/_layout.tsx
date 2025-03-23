import { Stack } from 'expo-router'
import StackHeader from '@components/stack-header'

export default () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{
        header: () => <StackHeader title='Profil' />,
      }}
    />

    <Stack.Screen
      name='change-username'
      options={{
        header: () => <StackHeader title='Zmień nazwę' />,
      }}
    />

    <Stack.Screen
      name='change-password'
      options={{
        header: () => <StackHeader title='Zmień hasło' />,
      }}
    />
  </Stack>
)

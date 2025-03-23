import { Stack } from 'expo-router'
import StackHeader from '@components/stack-header'

export default () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{
        header: () => <StackHeader title='Zmień tytuł' />,
      }}
    />
  </Stack>
)

import NavigationHeader from '@components/main-header'
import { Stack } from 'expo-router'

export default () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{
        header: () => <NavigationHeader title='Start' />,
      }}
    />
  </Stack>
)

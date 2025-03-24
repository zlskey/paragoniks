import StackHeader from '@components/stack-header'
import { Stack } from 'expo-router'

export default () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        header: () => <StackHeader title="Edycja produktu" />,
      }}
    />
  </Stack>
)

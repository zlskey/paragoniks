import StackHeader from '@components/stack-header'
import { Stack } from 'expo-router'

export default () => {
  return (
    <Stack>
      <Stack.Screen
        options={{ header: () => (
          <StackHeader title="Tworzenie paragonu" />
        ) }}
        name="index"
      />
    </Stack>
  )
}

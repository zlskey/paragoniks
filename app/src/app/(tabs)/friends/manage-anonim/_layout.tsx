import CreateAnonimsIcon from '@components/icons/create-anonim-icon'
import { Stack } from 'expo-router'
import StackHeader from '@components/stack-header'

export default () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{
        header: () => (
          <StackHeader title='Anonimy' endAdornment={<CreateAnonimsIcon />} />
        ),
      }}
    />
    <Stack.Screen name='create-anonim' options={{ headerShown: false }} />
  </Stack>
)

import StackHeader from '@components/stack-header'
import { Stack } from 'expo-router'
import React from 'react'

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

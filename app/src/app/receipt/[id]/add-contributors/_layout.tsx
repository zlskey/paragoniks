import CreateAnonimIcon from '@components/icons/create-anonim-icon'
import { Stack } from 'expo-router'
import StackHeader from '@components/stack-header'

export default () => (
  <Stack>
    <Stack.Screen
      name='index'
      options={{
        header: () => (
          <StackHeader
            endAdornment={<CreateAnonimIcon type='screen' />}
            title='Dodaj do podziału'
          />
        ),
      }}
    />

    <Stack.Screen
      name='create-anonim'
      options={{
        header: () => <StackHeader title='Stwórz anonima' />,
      }}
    />
  </Stack>
)

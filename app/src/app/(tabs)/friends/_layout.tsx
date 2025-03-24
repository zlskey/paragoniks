import Flex from '@components/flex'
import AddFriendIcon from '@components/icons/add-friend-icon'
import CreateAnonimIcon from '@components/icons/manage-anonims-icon'
import NavigationHeader from '@components/main-header'
import { Stack } from 'expo-router'

export default () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        header: () => (
          <NavigationHeader
            title="Znajomi"
            endAdornment={(
              <Flex spacing={1}>
                <CreateAnonimIcon />
                <AddFriendIcon />
              </Flex>
            )}
          />
        ),
      }}
    />
    <Stack.Screen name="manage-anonim" options={{ headerShown: false }} />
  </Stack>
)

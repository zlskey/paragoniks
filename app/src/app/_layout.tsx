import 'react-native-reanimated'
import 'react-native-gesture-handler'

import * as SplashScreen from 'expo-splash-screen'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import UserContextProvider, {
  useUserContext,
} from '@helpers/contexts/user.context'
import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { FontAwesome } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import NotificationWrapper from '@helpers/contexts/notification.context'
import { Provider as PaperProvider } from 'react-native-paper'
import { Stack } from 'expo-router'
import Wrapper from '@components/wrapper'
import { useFonts } from 'expo-font'
import { userMockup } from 'src/mockups/user'
import { whoamiUser } from 'src/api/endpoints/user/user.api'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

function RootLayoutNav() {
  const { loggedIn } = useUserContext()

  return (
    <PaperProvider>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name='index' redirect />

          <Stack.Screen
            redirect={loggedIn}
            name='auth'
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='(tabs)'
            options={{ headerShown: false }}
            redirect={!loggedIn}
          />

          <Stack.Screen
            name='profile'
            redirect={!loggedIn}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='receipt/[id]'
            redirect={!loggedIn}
            options={{ headerShown: false }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </PaperProvider>
  )
}

function RootLayout() {
  const [loggedIn, setLoggedIn] = useState(false)
  const { data, isPending } = useQuery({
    queryKey: ['user', 'whoami'],
    queryFn: whoamiUser,
  })

  const [loaded, error] = useFonts({
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if ((loaded || error) && !isPending) {
      SplashScreen.hideAsync()
    }
  }, [loaded, isPending])

  useEffect(() => {
    ;(async () => {
      const token = data?.token || ''

      await AsyncStorage.setItem('token', token)
      setLoggedIn(!!token)
    })()
  }, [data])

  const user = data?.user || userMockup

  if (isPending || !loaded) {
    return <Wrapper />
  }

  return (
    <UserContextProvider value={{ user, loggedIn }}>
      <RootLayoutNav />
    </UserContextProvider>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <NotificationWrapper>
          <RootLayout />
        </NotificationWrapper>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

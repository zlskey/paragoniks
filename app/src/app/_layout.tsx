import Wrapper from '@components/wrapper'
import { FontAwesome } from '@expo/vector-icons'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import NotificationWrapper from '@helpers/contexts/notification.context'
import UserContextProvider, {
  useUserContext,
} from '@helpers/contexts/user.context'
import { isWebOnDesktop, saveToStorage } from '@helpers/utils/storage'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import NoPcSupport from '@views/no-pc-support'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect, useMemo, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { whoamiUser } from 'src/api/endpoints/user/user.api'
import { userMockup } from 'src/mockups/user'
import 'react-native-reanimated'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

function RootLayoutNav() {
  const { loggedIn } = useUserContext()

  return (
    <PaperProvider>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" redirect />

          <Stack.Screen
            redirect={loggedIn}
            name="auth"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
            redirect={!loggedIn}
          />

          <Stack.Screen
            name="profile"
            redirect={!loggedIn}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="receipt/[id]"
            redirect={!loggedIn}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="receipt/create"
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
  const { data, isPending, error: whoamiError } = useQuery({
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
    async function handleLoggedIn() {
      const token = data?.token || ''
      await saveToStorage('token', token)
      setLoggedIn(!!token)
    }
    handleLoggedIn()
  }, [data, whoamiError])

  const user = data?.user ?? userMockup

  const value = useMemo(() => ({ user, loggedIn }), [user, loggedIn])

  if (isWebOnDesktop()) {
    return <NoPcSupport />
  }

  if (isPending || !loaded) {
    return <Wrapper />
  }

  return (
    <UserContextProvider value={value}>
      <RootLayoutNav />
    </UserContextProvider>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationWrapper>
            <RootLayout />
          </NotificationWrapper>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

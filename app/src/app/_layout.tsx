import Wrapper from '@components/wrapper'
import { FontAwesome } from '@expo/vector-icons'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import NotificationWrapper from '@helpers/contexts/notification.context'
import UserContextProvider, {
  useUserContext,
} from '@helpers/contexts/user.context'
import { saveToStorage } from '@helpers/utils/storage'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useMemo, useState } from 'react'
import { Platform, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MD3DarkTheme, Provider as PaperProvider, useTheme } from 'react-native-paper'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { whoamiUser } from 'src/api/endpoints/user/user.api'
import config from 'src/config'
import { userMockup } from 'src/mockups/user'
import 'react-native-reanimated'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

const darkTheme = {
  ...MD3DarkTheme,
  fonts: {
    ...MD3DarkTheme.fonts,
    regular: {
      fontFamily: 'Poppins-Regular',
    },
  },
  colors: {
    ...MD3DarkTheme.colors,
    background: '#0F0F0F',
    primary: '#388e3c',
    onPrimary: '#fff',
    onBackground: '#fff',
    error: '#bf360c',
    surface: '#191919',
    surfaceVariant: '#2c2c2c',
    onSurfaceVariant: '#b3b3b3',
  },
}

function RootLayoutNav() {
  const { loggedIn } = useUserContext()

  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="index" redirect />

        <Stack.Screen
          name="a"
          redirect={loggedIn}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="(tabs)"
          redirect={!loggedIn}
          options={{ headerShown: false }}
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

        <Stack.Screen
          name="confirm"
          redirect={Platform.OS !== 'web'}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="+not-found"
          options={{ headerShown: false }}
        />
      </Stack>
    </BottomSheetModalProvider>
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

  if (isPending || !loaded) {
    return <Wrapper />
  }

  return (
    <UserContextProvider value={value}>
      <RootLayoutNav />
    </UserContextProvider>
  )
}

function AppContent() {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  return (
    <>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
      >
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationWrapper>
              <View style={{
                maxWidth: config.MAX_CONTAINER_WIDTH,
                marginHorizontal: 'auto',
                width: '100%',
                flex: 1,
              }}
              >
                <RootLayout />
              </View>
            </NotificationWrapper>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  )
}

export default function App() {
  return (
    <PaperProvider theme={darkTheme}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </PaperProvider>
  )
}

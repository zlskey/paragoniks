import { useNotificationContext } from '@helpers/contexts/notification.context'
import { saveToStorage } from '@helpers/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import { loginWithGoogle } from 'src/api/endpoints/user/user.api'

const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID

export function useGoogleAuth() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()
  const handledWebRedirectRef = useRef(false)

  const { mutateAsync: mutateLoginGoogle, isPending: isGooglePending } = useMutation({
    mutationKey: ['auth', 'social', 'google'],
    mutationFn: loginWithGoogle,
    onSuccess: async (data) => {
      await saveToStorage('token', data.token)
      await queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
      addNotification(`Witaj ponownie ${data.user.username} ❣️`, 'success')
    },
    onError: () => {
      addNotification('Logowanie przez Google nie powiodło się', 'error')
    },
  })

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''

    if (Platform.OS !== 'web' || handledWebRedirectRef.current || !hash) {
      return
    }

    const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash)
    const idToken = params.get('id_token')

    if (!idToken) {
      return
    }

    handledWebRedirectRef.current = true
    mutateLoginGoogle({ idToken })
      .finally(() => {
        if (typeof window !== 'undefined') {
          const url = window.location.pathname + window.location.search
          window.history.replaceState({}, document.title, url)
        }
      })
      .catch(() => {
        addNotification('Wystąpił błąd podczas logowania przez Google', 'error')
      })
  }, [addNotification, mutateLoginGoogle])

  async function onGooglePress() {
    try {
      WebBrowser.maybeCompleteAuthSession()

      const redirectUri = AuthSession.makeRedirectUri({
        // Ensure this matches your Google OAuth client settings
        scheme: 'paragoniks',
        preferLocalhost: true,
      })

      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      }

      const clientId = Platform.select({
        ios: GOOGLE_IOS_CLIENT_ID as string,
        android: GOOGLE_ANDROID_CLIENT_ID as string,
        default: GOOGLE_WEB_CLIENT_ID as string,
      }) as string

      const nonce = Math.random().toString(36).slice(2) + Date.now().toString(36)
      const request = new AuthSession.AuthRequest({
        clientId,
        redirectUri,
        responseType: AuthSession.ResponseType.IdToken,
        scopes: ['openid', 'profile', 'email'],
        usePKCE: false,
        extraParams: { prompt: 'select_account', nonce, response_mode: 'fragment' },
      })

      await request.makeAuthUrlAsync(discovery)
      const result = await request.promptAsync(discovery)

      if (result.type !== 'success' || !result.params.id_token) {
        if (result.type !== 'cancel' && result.type !== 'dismiss') {
          addNotification('Anulowano logowanie przez Google', 'error')
        }
        return
      }

      if (Platform.OS === 'web') {
        return
      }

      await mutateLoginGoogle({ idToken: result.params.id_token })
    }
    catch (err: any) {
      console.error(err)
      addNotification('Wystąpił błąd podczas logowania przez Google', 'error')
    }
  }

  return { onGooglePress, isGooglePending }
}

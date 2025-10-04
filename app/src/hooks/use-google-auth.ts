import { useNotificationContext } from '@helpers/contexts/notification.context'
import { saveToStorage } from '@helpers/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import { loginWithGoogle } from 'src/api/endpoints/user/user.api'
import config from 'src/config'

// Debug helper function
function debugLog(message: string, data?: any) {
  if (__DEV__ || config.IS_PRODUCTION) {
    console.log(`[GoogleAuth] ${message}`, data || '')
  }
}

// Verification function to test OAuth configuration
function verifyOAuthConfig() {
  const platform = Platform.OS
  const clientId = Platform.select({
    ios: config.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    android: config.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    default: config.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  })

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'paragoniks',
    preferLocalhost: !config.IS_PRODUCTION,
    path: Platform.OS === 'web' ? '/a' : undefined,
  })

  debugLog('OAuth Configuration Verification', {
    platform,
    isProduction: config.IS_PRODUCTION,
    clientId: clientId ? `${clientId.substring(0, 20)}...` : 'MISSING',
    redirectUri,
    hasWebClientId: !!config.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    hasAndroidClientId: !!config.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    hasIosClientId: !!config.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  })

  // Test redirect URI generation
  const testRedirectUri = AuthSession.makeRedirectUri({
    scheme: 'paragoniks',
    preferLocalhost: true,
  })

  debugLog('Redirect URI Test', {
    productionUri: redirectUri,
    localhostUri: testRedirectUri,
    expectedWebUri: config.IS_PRODUCTION
      ? 'https://yourdomain.com/a'
      : 'http://localhost:3000/a',
  })

  return {
    platform,
    clientId,
    redirectUri,
    isValid: !!clientId,
  }
}

export function useGoogleAuth() {
  const addNotification = useNotificationContext()
  const queryClient = useQueryClient()
  const handledWebRedirectRef = useRef(false)

  // Verify OAuth configuration on initialization
  const oauthConfig = verifyOAuthConfig()

  debugLog('Initializing Google Auth hook', {
    platform: Platform.OS,
    isProduction: config.IS_PRODUCTION,
    hasWebClientId: !!config.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    hasAndroidClientId: !!config.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    hasIosClientId: !!config.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    configValid: oauthConfig.isValid,
  })

  const { mutateAsync: mutateLoginGoogle, isPending: isGooglePending } = useMutation({
    mutationKey: ['auth', 'social', 'google'],
    mutationFn: loginWithGoogle,
    onSuccess: async (data) => {
      debugLog('Google login successful', { username: data.user.username })
      await saveToStorage('token', data.token)
      await queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
      addNotification(`Witaj ponownie ${data.user.username} ❣️`, 'success')
    },
    onError: (error) => {
      debugLog('Google login failed', { error: error.message, stack: error.stack })
      addNotification('Logowanie przez Google nie powiodło się', 'error')
    },
  })

  useEffect(() => {
    const hash = typeof window !== 'undefined' && Platform.OS === 'web' ? window.location.hash : ''

    debugLog('Web redirect effect triggered', {
      platform: Platform.OS,
      hasHash: !!hash,
      hash: hash.substring(0, 100) + (hash.length > 100 ? '...' : ''),
      handledWebRedirect: handledWebRedirectRef.current,
    })

    if (Platform.OS !== 'web' || handledWebRedirectRef.current || !hash) {
      debugLog('Skipping web redirect handling', {
        reason: Platform.OS !== 'web' ? 'not web' : handledWebRedirectRef.current ? 'already handled' : 'no hash',
      })
      return
    }

    const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash)
    const idToken = params.get('id_token')
    const error = params.get('error')
    const errorDescription = params.get('error_description')

    debugLog('Parsed URL parameters', {
      hasIdToken: !!idToken,
      idTokenLength: idToken?.length || 0,
      error,
      errorDescription,
      allParams: Object.fromEntries(params.entries()),
    })

    if (error) {
      debugLog('OAuth error in redirect', { error, errorDescription })
      addNotification(`Błąd autoryzacji Google: ${errorDescription || error}`, 'error')
      return
    }

    if (!idToken) {
      debugLog('No id_token found in redirect')
      return
    }

    handledWebRedirectRef.current = true
    debugLog('Processing web redirect with id_token')

    mutateLoginGoogle({ idToken })
      .finally(() => {
        if (typeof window !== 'undefined') {
          const url = window.location.pathname + window.location.search
          window.history.replaceState({}, document.title, url)
          debugLog('Cleaned up URL after redirect')
        }
      })
      .catch((error) => {
        debugLog('Error processing web redirect', { error: error.message })
        addNotification('Wystąpił błąd podczas logowania przez Google', 'error')
      })
  }, [addNotification, mutateLoginGoogle])

  async function onGooglePress() {
    debugLog('Starting Google OAuth flow', { platform: Platform.OS })

    try {
      WebBrowser.maybeCompleteAuthSession()

      // Generate redirect URI with proper configuration for production
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'paragoniks',
        preferLocalhost: !config.IS_PRODUCTION, // Use localhost only in development
        path: Platform.OS === 'web' ? '/a' : undefined, // Add path for web
      })

      debugLog('Generated redirect URI', { redirectUri })

      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      }

      const clientId = Platform.select({
        ios: config.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        android: config.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        default: config.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      })

      debugLog('Selected client ID', {
        platform: Platform.OS,
        clientId: `${clientId?.substring(0, 20)}...`,
        hasClientId: !!clientId,
      })

      if (!clientId) {
        throw new Error(`No Google OAuth client ID configured for platform: ${Platform.OS}`)
      }

      const nonce = Math.random().toString(36).slice(2) + Date.now().toString(36)

      // Configure request based on platform
      const requestConfig: any = {
        clientId,
        redirectUri,
        responseType: AuthSession.ResponseType.IdToken,
        scopes: ['openid', 'profile', 'email'],
        usePKCE: false,
        extraParams: {
          prompt: 'select_account',
          nonce,
          response_mode: Platform.OS === 'web' ? 'fragment' : 'query',
        },
      }

      // Add platform-specific configurations
      if (Platform.OS === 'web') {
        requestConfig.extraParams.redirect_uri = redirectUri
      }

      debugLog('Creating auth request', {
        clientId: `${clientId.substring(0, 20)}...`,
        redirectUri,
        responseMode: requestConfig.extraParams.response_mode,
        hasNonce: !!nonce,
      })

      const request = new AuthSession.AuthRequest(requestConfig)

      debugLog('Making auth URL')
      await request.makeAuthUrlAsync(discovery)

      debugLog('Prompting for authentication')
      const result = await request.promptAsync(discovery)

      debugLog('Auth result received', {
        type: result.type,
        hasIdToken: !!(result as any).params?.id_token,
        hasError: !!(result as any).params?.error,
        error: (result as any).params?.error,
        errorDescription: (result as any).params?.error_description,
        allParams: (result as any).params,
      })

      if (result.type !== 'success' || !(result as any).params?.id_token) {
        if (result.type === 'error') {
          debugLog('OAuth error', {
            error: (result as any).params?.error,
            errorDescription: (result as any).params?.error_description,
          })
          addNotification(`Błąd autoryzacji: ${(result as any).params?.error_description || (result as any).params?.error || 'Nieznany błąd'}`, 'error')
        }
        else if (result.type !== 'cancel' && result.type !== 'dismiss') {
          debugLog('Unexpected result type', { type: result.type })
          addNotification('Anulowano logowanie przez Google', 'error')
        }
        return
      }

      if (Platform.OS === 'web') {
        debugLog('Web platform - redirect will be handled by useEffect')
        return
      }

      debugLog('Processing mobile auth result')
      await mutateLoginGoogle({ idToken: (result as any).params.id_token })
    }
    catch (err: any) {
      debugLog('Google OAuth error', {
        message: err.message,
        stack: err.stack,
        name: err.name,
        code: err.code,
      })
      addNotification('Wystąpił błąd podczas logowania przez Google', 'error')
    }
  }

  // Function to test OAuth configuration
  function testOAuthConfig() {
    const oauthConfig = verifyOAuthConfig()

    debugLog('OAuth Configuration Test Results', {
      ...oauthConfig,
      recommendations: [
        !oauthConfig.clientId && '❌ No client ID found for current platform',
        oauthConfig.platform === 'web' && !oauthConfig.redirectUri.includes('https') && config.IS_PRODUCTION && '⚠️ Web redirect URI should use HTTPS in production',
        oauthConfig.platform === 'android' && '📱 Verify package name and SHA-1 in Google Cloud Console',
        oauthConfig.platform === 'ios' && '🍎 Verify bundle identifier in Google Cloud Console',
      ].filter(Boolean),
    })

    return oauthConfig
  }

  return { onGooglePress, isGooglePending, testOAuthConfig }
}

const config = {
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  // API URLs
  EXPO_PUBLIC_RS_API_URL: process.env.EXPO_PUBLIC_RS_API_URL || 'http://localhost:3000',

  // Google OAuth
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
  EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '',
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',

  // Localization
  LOCALE: 'pl-PL',
  LOCALE_CURRENCY: 'PLN',

  // Max container width
  MAX_CONTAINER_WIDTH: 700,
}

type Config = typeof config
type ConfigKeys = keyof Config

const requiredConfig: ConfigKeys[] = [
  'EXPO_PUBLIC_RS_API_URL',
  'EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID',
  'EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID',
  'EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID',
]

for (const key of requiredConfig) {
  if (!config[key]) {
    throw new Error(`${key} is not set`)
  }
}

export default config

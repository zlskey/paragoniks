import dotenv from 'dotenv'

dotenv.config()

const config = {
  // limits
  MAX_SCAN_COUNT: 5,
  SCAN_COUNT_EXPIRATION_TIME: 24 * 60 * 60 * 1000, // 24 hours
  MAIL_CONFIRMATION_EXPIRATION_TIME: 3 * 60 * 60 * 1000, // 3 hours
  PASSWORD_RECOVERY_EXPIRATION_TIME: 10 * 60 * 1000, // 10 minutes
  PASSWORD_RECOVERY_RESEND_CODE_TIME: 30 * 1000, // 30 seconds

  // Cookie configuration
  MAX_COOKIE_AGE: 1000 * 60 * 60 * 24 * 3, // 3 days in milliseconds

  // Mailing
  SOCIALS_X_URL: '#',
  SOCIALS_INSTAGRAM_URL: '#',
  SOCIALS_TIKTOK_URL: '#',
  SOCIALS_CONTACT_EMAIL: '#',

  // App icon
  APP_ICON_URL: 'https://paragoniks.pl/public/splash.png',

  // Server configuration
  PORT: Number.parseInt(process.env.PORT || '80', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // Database
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/paragoniks',
  MONGODB_ROOT_USERNAME: process.env.MONGODB_ROOT_USERNAME || '',
  MONGODB_ROOT_PASSWORD: process.env.MONGODB_ROOT_PASSWORD || '',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',

  // OpenAI
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',

  // Google Cloud Platform
  BUCKET_NAME: process.env.BUCKET_NAME || 'paragoniks-bucket',
  PROJECT_ID: process.env.PROJECT_ID || 'paragoniks',
  GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '',

  // Domain
  MAIN_DOMAIN: process.env.MAIN_DOMAIN || 'localhost',

  // Google OAuth
  GOOGLE_ANDROID_CLIENT_ID: process.env.GOOGLE_ANDROID_CLIENT_ID || '',
  GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID || '',
  GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID || '',

  // ProtonMail
  PROTONMAIL_USER: process.env.PROTONMAIL_USER || '',
  PROTONMAIL_TOKEN: process.env.PROTONMAIL_TOKEN || '',
} as const

type Config = typeof config
type ConfigKeys = keyof Config

const requiredInBothConfig: ConfigKeys[] = [
  'PORT',
  'NODE_ENV',
  'CORS_ORIGIN',
  'MONGODB_URL',
  'MONGODB_ROOT_USERNAME',
  'MONGODB_ROOT_PASSWORD',
  'JWT_SECRET',
  'OPENAI_API_KEY',
  'BUCKET_NAME',
  'PROJECT_ID',
  'MAIN_DOMAIN',
  'GOOGLE_ANDROID_CLIENT_ID',
  'GOOGLE_IOS_CLIENT_ID',
  'GOOGLE_WEB_CLIENT_ID',
  'PROTONMAIL_USER',
  'PROTONMAIL_TOKEN',
]

const requiredInProduction: ConfigKeys[] = [
  'GOOGLE_SERVICE_ACCOUNT_KEY',
]

for (const key of requiredInBothConfig) {
  if (!config[key]) {
    throw new Error(`${key} is not set`)
  }
}

if (config.IS_PRODUCTION) {
  for (const key of requiredInProduction) {
    if (!config[key]) {
      throw new Error(`${key} is not set`)
    }
  }
}

export default config

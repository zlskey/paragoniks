const config = {
  // Scan limits
  MAX_SCAN_COUNT: 5,
  SCAN_COUNT_EXPIRATION_TIME: 1 * 24 * 60 * 60 * 1000, // 24 hours

  // Server configuration
  PORT: Number.parseInt(process.env.PORT || '80', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  // Cookie configuration
  MAX_COOKIE_AGE: 1000 * 60 * 60 * 24 * 3, // 3 days in milliseconds

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

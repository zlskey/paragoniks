import { Storage } from '@google-cloud/storage'
import config from 'src/config'
import { ErrorObject } from 'src/middlewares/error.middleware'

const storage = getStorage()

const bucket = storage.bucket(config.BUCKET_NAME)

enum DirectoryName {
  RECEIPTS = 'receipts',
  AVATARS = 'avatars',
}

function getFilePath(userId: string, directory: DirectoryName) {
  return `${directory}/${userId}/${new Date().getTime()}.png`
}

function getImagePublicUrl(filePath: string) {
  const serviceUrl = config.IS_PRODUCTION ? 'https://storage.googleapis.com' : 'http://localhost:4443'
  if (!config.IS_PRODUCTION) {
    return `${serviceUrl}/storage/v1/b/${config.BUCKET_NAME}/o/${filePath}?alt=media`
  }
  return `${serviceUrl}/${config.BUCKET_NAME}/${filePath}`
}

export async function uploadImageToBucket(directory: DirectoryName, userId: string, buffer: Buffer) {
  const filePath = getFilePath(userId, directory)
  const file = bucket.file(filePath)

  try {
    await file.save(buffer, { contentType: 'image/png' })
  }
  catch (err) {
    console.error(err)
    throw new ErrorObject('Wystąpił błąd podczas tworzenia pliku', 401)
  }

  return getImagePublicUrl(filePath)
}

export async function uploadReceiptImage(userId: string, buffer: Buffer) {
  return uploadImageToBucket(DirectoryName.RECEIPTS, userId, buffer)
}

export async function uploadAvatarImage(userId: string, buffer: Buffer) {
  return uploadImageToBucket(DirectoryName.AVATARS, userId, buffer)
}

function getStorage() {
  if (config.IS_PRODUCTION) {
    return new Storage({
      projectId: config.PROJECT_ID,
      credentials: getCredentials(),
    })
  }
  return new Storage({
    projectId: config.PROJECT_ID,
    apiEndpoint: 'http://paragoniks-bucket:4443',
  })
}

export function getCredentials() {
  if (!config.IS_PRODUCTION) {
    return undefined
  }

  const credentials = config.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not set')
  }

  return JSON.parse(credentials)
}

async function createBucketForDevEnvironment() {
  if (config.IS_PRODUCTION) {
    return null
  }
  const [exists] = await bucket.exists()
  if (exists) {
    return null
  }
  return bucket.create()
}
createBucketForDevEnvironment()

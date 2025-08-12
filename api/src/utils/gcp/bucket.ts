import { Storage } from '@google-cloud/storage'
import { ErrorObject } from 'src/middlewares/error.middleware'

const BUCKET_NAME = process.env.BUCKET_NAME ?? 'paragoniks-bucket'
const PROJECT_ID = process.env.PROJECT_ID ?? 'paragoniks'
const isProdEnv = process.env.NODE_ENV === 'production'

const storage = getStorage()

const bucket = storage.bucket(BUCKET_NAME)

enum DirectoryName {
  RECEIPTS = 'receipts',
  AVATARS = 'avatars',
}

function getFilePath(userId: string, directory: DirectoryName) {
  return `${directory}/${userId}/${new Date().getTime()}.png`
}

function getImagePublicUrl(filePath: string) {
  const serviceUrl = isProdEnv ? 'https://storage.googleapis.com' : 'http://localhost:4443'
  if (!isProdEnv) {
    return `${serviceUrl}/storage/v1/b/${BUCKET_NAME}/o/${filePath}?alt=media`
  }
  return `${serviceUrl}/${BUCKET_NAME}/${filePath}`
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
  if (isProdEnv) {
    return new Storage({
      projectId: PROJECT_ID,
      credentials: getCredentials(),
    })
  }
  return new Storage({
    projectId: PROJECT_ID,
    apiEndpoint: 'http://paragoniks-bucket:4443',
  })
}

export function getCredentials() {
  if (!isProdEnv) {
    return undefined
  }

  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not set')
  }

  return JSON.parse(credentials)
}

async function createBucketForDevEnvironment() {
  if (isProdEnv) {
    return null
  }
  const [exists] = await bucket.exists()
  if (exists) {
    return null
  }
  return bucket.create()
}
createBucketForDevEnvironment()

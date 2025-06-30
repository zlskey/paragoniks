import { Storage } from '@google-cloud/storage'
import { ErrorObject } from 'src/middlewares/error.middleware'

const BUCKET_NAME = process.env.BUCKET_NAME ?? 'paragoniks-bucket'
const PROJECT_ID = process.env.PROJECT_ID ?? 'paragoniks'

const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY) : null
const isProdEnv = process.env.NODE_ENV === 'production'

const apiEndpoint = `https://storage.googleapis.com/${BUCKET_NAME}`

const storage = new Storage({
  credentials,
  projectId: PROJECT_ID,
})
const bucket = storage.bucket(BUCKET_NAME)

enum DirectoryName {
  RECEIPTS = 'receipts',
  AVATARS = 'avatars',
}

function getFilePath(userId: string, directory: DirectoryName) {
  return `${directory}/${userId}/${new Date().getTime()}.png`
}

function getImagePublicUrl(filePath: string) {
  if (!isProdEnv) {
    return `${apiEndpoint}/storage/v1/b/${BUCKET_NAME}/o/${encodeURIComponent(filePath)}?alt=media`
  }
  return `${apiEndpoint}/${filePath}`
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

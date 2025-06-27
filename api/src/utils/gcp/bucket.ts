import type { Bucket } from '@google-cloud/storage'
import { Storage } from '@google-cloud/storage'
import { ErrorObject } from 'src/middlewares/error.middleware'

const apiEndpoint = process.env.BUCKET_URL ?? 'http://paragoniks-bucket:4443'
const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY) : null
const projectId = process.env.PROJECT_ID ?? 'paragoniks'
const isProdEnv = process.env.NODE_ENV === 'production'

const storage = new Storage({
  apiEndpoint,
  projectId,
  credentials,
})

enum BucketName {
  RECEIPTS = 'receipts',
  AVATARS = 'avatars',
}

const buckets = Object
  .fromEntries(
    Object
      .values(BucketName)
      .map(bucketName => [bucketName, storage.bucket(bucketName)]),
  ) as Record<BucketName, Bucket>

function getFilePath(userId: string) {
  return `${userId}/${new Date().getTime()}.png`
}

function getImagePublicUrl(bucket: BucketName, filePath: string) {
  if (!isProdEnv) {
    return `${apiEndpoint}/storage/v1/b/${bucket}/o/${encodeURIComponent(filePath)}?alt=media`
  }

  return `https://storage.googleapis.com/${bucket}/${encodeURIComponent(filePath)}`
}

export async function uploadImageToBucket(bucketName: BucketName, userId: string, buffer: Buffer) {
  const filePath = getFilePath(userId)
  const file = buckets[bucketName].file(filePath)

  try {
    await file.save(buffer, { contentType: 'image/png' })
    if (isProdEnv) {
      await file.makePublic()
    }
  }
  catch (err) {
    console.error(err)
    throw new ErrorObject('Wystąpił błąd podczas tworzenia pliku', 401)
  }

  return getImagePublicUrl(bucketName, filePath)
}

export async function uploadReceiptToBucket(userId: string, buffer: Buffer) {
  return uploadImageToBucket(BucketName.RECEIPTS, userId, buffer)
}

export async function uploadAvatarToBucket(userId: string, buffer: Buffer) {
  return uploadImageToBucket(BucketName.AVATARS, userId, buffer)
}

/* ======== init ======== */
async function initBuckets() {
  for (const [name, bucket] of Object.entries(buckets)) {
    const [doesBucketExists] = await bucket.exists()
    if (!doesBucketExists) {
      await storage.createBucket(name)
    }
  }
}
initBuckets()

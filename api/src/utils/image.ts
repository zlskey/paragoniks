import type { UserId } from 'src/types/generic.types'
import { writeFileSync } from 'node:fs'

export async function parseAndSaveImage(userId: UserId, base64: string) {
  if (!base64 || base64 === 'null') {
    return null
  }

  const imageBuffer = Buffer.from(base64, 'base64')
  const imageUint8Array = new Uint8Array(
    imageBuffer.buffer,
    imageBuffer.byteOffset,
    imageBuffer.byteLength,
  )
  const imagePath = `./uploads/${userId}_${new Date().getTime()}.png`

  writeFileSync(imagePath, imageUint8Array)

  return imagePath
}

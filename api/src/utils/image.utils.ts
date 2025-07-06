import sharp from 'sharp'
import { ErrorObject } from 'src/middlewares/error.middleware'

export function getImageBufferFromBase64(base64: string): Buffer {
  try {
    return Buffer.from(base64, 'base64')
  }
  catch (error) {
    console.error('Error converting base64 to buffer:', error)
    throw new ErrorObject('Nie udało się przetworzyć obrazu', 400)
  }
}

export async function compressImageBuffer(buffer: Buffer) {
  try {
    const compressedBuffer = await sharp(buffer)
      .jpeg({ quality: 70 })
      .toBuffer()
    return compressedBuffer
  }
  catch (error) {
    console.error('Error compressing image:', error)
    throw new ErrorObject('Nie udało się przetworzyć obrazu', 500)
  }
}

export async function getCompressedImageBufferFromBase64(base64: string) {
  const buffer = getImageBufferFromBase64(base64)
  const compressedBuffer = await compressImageBuffer(buffer)

  return compressedBuffer
}

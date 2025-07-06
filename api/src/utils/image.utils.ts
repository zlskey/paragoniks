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

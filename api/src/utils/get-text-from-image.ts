import { ImageLike, createWorker } from 'tesseract.js'

const test_path = 'https://i.imgur.com/W68KVnu.png'

export const getTextFromImage = async (path: ImageLike = test_path) => {
  const worker = await createWorker('pol', 1)

  const data = await worker.recognize(path)

  await worker.terminate()

  const text = data.data.text

  return text
}

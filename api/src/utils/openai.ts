import type { ISimpleProduct, ISimpleReceipt } from 'src/models/receipt.model'
import { OpenAI } from 'openai'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { getScanImagePrompt } from './prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function extractReceiptDataFromText(imageBase64: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: getScanImagePrompt(),
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
              detail: 'high',
            },
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const message = response.choices[0].message.content

  if (message === 'error') {
    throw new ErrorObject('Invalid image provided', 401)
  }

  const receiptObj = JSON.parse(message)

  return receiptObj as ISimpleReceipt
}

export async function generateReceiptTitle(products: ISimpleProduct[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: getScanImagePrompt(),
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const message = response.choices[0].message.content

  if (message === 'error') {
    return null
  }

  const receiptObj = JSON.parse(message)

  return receiptObj as ISimpleReceipt
}

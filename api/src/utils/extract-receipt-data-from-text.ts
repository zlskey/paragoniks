import { ErrorObject } from 'src/middlewares/error.middleware'
import { ISimpleReceipt } from 'src/models/receipt.model'
import { OpenAI } from 'openai'
import { getPrompt } from './get-prompt'

const openai = new OpenAI({
  apiKey: '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', // replace with your own API key
})

export const extractReceiptDataFromText = async (text: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: getPrompt(text),
      },
    ],
  })

  const message = response.choices[0].message.content

  if (message === 'error') {
    throw new ErrorObject('Invalid image provided', 401)
  }

  const receiptObj = JSON.parse(message)

  return receiptObj as ISimpleReceipt
}

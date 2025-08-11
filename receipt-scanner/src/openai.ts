import type { ISimpleProduct } from 'src/generic.types'
import _ from 'lodash'
import { OpenAI } from 'openai'
import { zodTextFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { getScanImagePrompt } from './prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const receiptFormat = z.object({
  title: z.string(),
  sum: z.number(),
  products: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      count: z.number(),
      discount: z.number(),
    }),
  ),
  error: z.string().nullable(),
})

export async function extractReceiptDataFromText(imageBase64: string) {
  const response = await openai.responses.create({
    model: 'gpt-4o',
    input: [
      {
        role: 'system',
        content: getScanImagePrompt(),
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_image',
            image_url: `data:image/jpeg;base64,${imageBase64}`,
            detail: 'high',
          },
        ],
      },
    ],
    temperature: 1,
    max_output_tokens: 2048,
    text: {
      format: zodTextFormat(receiptFormat, 'receipt'),
    },
  })
  const responseObj = JSON.parse(response.output_text)

  if (responseObj.error) {
    throw new Error('Niepoprawne zdjęcie paragonu')
  }

  return _.omit(responseObj, 'error') as {
    products: ISimpleProduct[]
    title: string
    sum: number
  }
}

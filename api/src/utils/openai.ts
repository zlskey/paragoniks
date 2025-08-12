import type { ISimpleProduct } from 'src/models/receipt.model'
import _ from 'lodash'
import { OpenAI } from 'openai'
import { zodTextFormat } from 'openai/helpers/zod'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { z } from 'zod'
import { getScanImagePrompt, getTitlePrompt } from './prompts'

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
    throw new ErrorObject('Niepoprawne zdjęcie paragonu', 401)
  }

  return _.omit(responseObj, 'error') as {
    products: ISimpleProduct[]
    title: string
  }
}

const titleFormat = z.object({
  title: z.string(),
  error: z.string().nullable(),
})

export async function generateReceiptTitle(products: ISimpleProduct[]): Promise<string | null> {
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: getTitlePrompt(products),
          },
        ],
      },
    ],
    temperature: 1,
    max_output_tokens: 2048,
    text: {
      format: zodTextFormat(titleFormat, 'title'),
    },
  })
  const responseObj = JSON.parse(response.output_text)

  if (responseObj.error) {
    return null
  }

  return responseObj.title as string
}

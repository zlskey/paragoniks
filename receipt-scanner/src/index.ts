import type { IReceipt } from './generic.types'
import { MongoClient, ObjectId } from 'mongodb'
import { extractReceiptDataFromText } from './openai'

// CloudEvent payload for Pub/Sub messagePublished events
interface PubSubMessagePublishedCloudEvent {
  data: {
    message: {
      data: string
    }
  }
}

/**
 * Cloud Function (Gen 2) entry point triggered by Pub/Sub.
 * The event data contains the receipt ID encoded in base64.
 */
export async function scanReceipt(event: PubSubMessagePublishedCloudEvent): Promise<void> {
  const messageData = Buffer.from(event.data.message.data, 'base64').toString('utf8')
  const receiptId = new ObjectId(messageData)

  const client = new MongoClient(process.env.MONGODB_URL ?? '')
  try {
    console.log('Scanning receipt', receiptId)
    throw new Error('test')

    await client.connect()

    const db = client.db('paragoniks')
    const receiptsCollection = db.collection<IReceipt>('receipts')
    const receipt = await receiptsCollection.findOne({ _id: receiptId })

    if (!receipt)
      throw new Error('Receipt not found')

    const scannedReceipt = await extractReceiptDataFromText(receipt.imagePath)
    console.log(scannedReceipt)
  }
  catch (error) {
    if (error instanceof Error)
      throw new Error(error.message)

    console.error(error)
  }
  finally {
    await client.close()
  }
}

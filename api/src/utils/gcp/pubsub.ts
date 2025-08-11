import { PubSub } from '@google-cloud/pubsub'
import { getCredentials } from './utils'

const PROJECT_ID = process.env.PROJECT_ID ?? 'paragoniks'
const isProdEnv = process.env.NODE_ENV === 'production'

const pubsub = new PubSub({
  projectId: PROJECT_ID,
  credentials: getCredentials(),
  apiEndpoint: getApiEndpoint(),
})

const QUEUE_NAME = process.env.RECEIPTS_TO_ANALYZE_QUEUE_NAME ?? 'receipts-to-analyze'
const queue = pubsub.topic(QUEUE_NAME)

// Publishes a structured message to the queue. This is still useful when
// consumers expect a JSON payload but **will not** trigger the receipt
// scanning Cloud Function because the function expects a raw string in the
// message data.
export async function publishReceiptToAnalizeMessage(
  receiptId: string,
) {
  return queue.publishMessage({ json: { receiptId } })
}

/**
 * Publish a Pub/Sub message that will trigger the `scanReceipt` Cloud
 * Function. The function expects the message data to be the receipt ID as a
 * UTF-8 string (base64-encoded automatically by Pub/Sub).
 *
 * @param receiptId - MongoDB ObjectId of the receipt to scan
 * @returns the message ID assigned by Pub/Sub
 */
export async function publishReceiptScanMessage(receiptId: string) {
  // Pub/Sub encodes the Buffer as base64 under the hood, which matches what
  // the Cloud Function expects (`event.data.message.data`).
  return queue.publishMessage({ data: Buffer.from(receiptId, 'utf8') })
}

publishReceiptScanMessage('123')

function getApiEndpoint() {
  return isProdEnv ? undefined : 'http://paragoniks-pubsub:8432'
}

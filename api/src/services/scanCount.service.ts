import type { UserId } from 'src/types/backend.types'
import ScanCount from 'src/models/scanCount.model'

export async function getOrCreateScanCount(userId: UserId) {
  const scanCount = await ScanCount.findOne({ userId })
  const isExpired = scanCount?.isExpired()

  if (scanCount && !isExpired) {
    return scanCount
  }

  if (isExpired) {
    await scanCount?.deleteOne()
  }

  return await ScanCount.create({ userId, count: 0 })
}

export async function getScanCountAndExpirationDate(userId: UserId) {
  const scanCount = await ScanCount.findOne({ userId })
  return {
    count: scanCount?.count ?? 0,
    expirationDate: scanCount?.getExpirationDate() ?? null,
  }
}

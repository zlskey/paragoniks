import type { RequestHandler } from 'express'
import config from 'src/config'
import { scanCountService } from 'src/services/scan-count'

export const handleGetScanCount: RequestHandler = async (req, res) => {
  const user = req.user

  const { count, expirationDate } = await scanCountService.getScanCountAndExpirationDate(user._id)
  const scansLeft = Math.max(0, config.MAX_SCAN_COUNT - count)

  res.status(200).json({
    scansLeft,
    expirationDate,
  })
}

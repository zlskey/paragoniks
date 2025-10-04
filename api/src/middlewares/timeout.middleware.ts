import type { RequestHandler } from 'express'
import config from 'src/config'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const addTimeout: RequestHandler = async (
  req,
  res,
  next,
) => {
  if (config.shouldTimeout) {
    await wait(1000)
  }

  return next()
}

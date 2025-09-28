import type { RequestHandler } from 'express'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const packageJsonPath = path.join(__dirname, '..', '..', '..', 'package.json')
const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
const packageJson = JSON.parse(packageJsonContent)
const version = packageJson.version

export const healthCheck: RequestHandler = async (req, res) => {
  res.json({ version })
}

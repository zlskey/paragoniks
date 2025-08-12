export function isValidBase64(str: any) {
  if (typeof str !== 'string')
    return false

  // Remove data URL scheme if present
  const cleanedStr = str.trim().replace(/^data:.*;base64,/, '')

  // Base64 regex (allows padding with = and line breaks)
  const base64Regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i

  if (!base64Regex.test(cleanedStr))
    return false

  try {
    const decoded = Buffer.from(cleanedStr, 'base64').toString('utf-8')
    const reEncoded = Buffer.from(decoded, 'utf-8').toString('base64')
    return reEncoded.replace(/=+$/, '') === cleanedStr.replace(/=+$/, '')
  }
  catch (err: any) {
    console.error('Base64 validation error:', err.message)
    return false
  }
}

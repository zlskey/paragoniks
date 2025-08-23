// Shared types for both frontend and backend
export interface ApiError {
  message: string
  code: number
}

export type ImageBase64 = string

// Export individual type files for better organization
export * from './user.types'
export * from './receipt.types'
export * from './product.types'
export * from './division.types'
export * from './scanCount.types'

export default {}

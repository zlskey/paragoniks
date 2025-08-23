import { Product } from "./product.types"

export enum ScanningStatus {
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface Receipt {
  _id: unknown
  owner: unknown
  products: Product[]
  contributors: Record<string, number>
  title: string
  sum: number
  imagePath: string
  createdAt: string
  updatedAt: string
  isRemoved?: boolean
  scanning?: {
    status: ScanningStatus
    errorMessage?: string
  }
}

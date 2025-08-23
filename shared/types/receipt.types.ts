export interface SimpleReceipt {
  sum: number
  title: string
  products: any[]
}

export enum ScanningStatus {
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface Receipt extends SimpleReceipt {
  _id: string
  owner: string
  contributors: Record<string, number>
  products: any[]
  imagePath: string
  createdAt: string
  updatedAt: string
  scanning?: {
    status: ScanningStatus
    errorMessage?: string
  }
}

export type ReceiptId = string

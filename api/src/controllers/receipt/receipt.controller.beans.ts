import type { BaseProduct } from 'src/types'

export interface HandleCreateReceiptBean {
  title: string
  products: BaseProduct[]
  contributors: Record<string, number>
  image: string | null
  shouldGenerateProducts: boolean
  shouldGenerateTitle?: boolean
}

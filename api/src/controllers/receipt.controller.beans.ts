import type { ISimpleProduct } from 'src/models/receipt.model'

export interface HandleCreateReceiptBean {
  title: string
  products: ISimpleProduct[]
  contributors: Record<string, number>
  image: string | null
  shouldGenerateProducts: boolean
  shouldGenerateTitle?: boolean
}

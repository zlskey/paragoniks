export interface SimpleProduct {
  name: string
  price: number
  count: number
  discount: number
}

export interface Product extends SimpleProduct {
  _id: string
  division: Record<string, number | null>
  divisionType: string
  totalPrice: number
}

export function isProduct(obj: any): obj is Product {
  return (
    typeof obj === 'object'
    && obj !== null
    && typeof obj._id === 'string'
    && typeof obj.totalPrice === 'number'
    && 'division' in obj
    && 'divisionType' in obj
  )
}

export type ProductId = string

import { Division, DivisionType } from "./division.types"

export interface Product {
  _id: unknown
  division: Division
  divisionType: DivisionType
  name: string
  price: number
  count: number
  discount: number
  totalPrice: number
}

export type BaseProduct = Pick<Product, 'name' | 'price' | 'count' | 'discount'>

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

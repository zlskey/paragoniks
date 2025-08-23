import type {
  ImageBase64,
  Product,
  ProductId,
  ReceiptId,
  SimpleProduct,
  UserId,
} from '@paragoniks/shared'

export interface GetUserReceiptsBody {}

export interface CreateReceiptBody {
  title: string
  products: SimpleProduct[]
  contributors: Record<string, number>
  image: ImageBase64 | null
  shouldGenerateProducts: boolean
  shouldGenerateTitle?: boolean
}

export interface GetReceiptBody {
  receiptId: ReceiptId
}

export interface ToggleProductComprisingBody {
  receiptId: ReceiptId
  productId: ProductId
}

export interface RemoveReceiptBody {
  receiptId: ReceiptId
}

export interface ChangeReceiptTitleBody {
  receiptId: ReceiptId
  newTitle: string
}

export interface AddContributorBody {
  receiptId: ReceiptId
  contributorId: UserId
}

export interface RemoveContributorBody {
  receiptId: ReceiptId
  contributorId: UserId
}

export interface UpdateProductBody {
  receiptId: ReceiptId
  productId: ProductId
  product: Pick<Product, 'name' | 'price' | 'division' | 'count'>
}

export interface RemoveProductBody {
  receiptId: ReceiptId
  productId: ProductId
}

export interface GetContributorsBody {
  receiptId: ReceiptId
}

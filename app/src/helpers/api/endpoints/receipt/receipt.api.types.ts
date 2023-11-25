import {
  ContributorId,
  ProductId,
  ReceiptId,
  UserId,
} from 'src/types/generic.types'

export interface GetUserReceiptsBody {}

export interface CreateReceiptBody {
  image: File
}

export interface GetReceiptBody {
  receiptId: ReceiptId
}

export interface ToggleProductComprisingBody {
  receiptId: ReceiptId
  productId: ProductId
  userId: UserId
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
  contributorId: ContributorId
}

export interface RemoveContributorBody {
  receiptId: ReceiptId
  contributorId: ContributorId
}

export interface UpdateProductBody {
  receiptId: ReceiptId
  productId: ProductId
  product: {
    name: string
    price: number
    count: number
  }
}

export interface GetContributorsBody {
  receiptId: ReceiptId
}

export interface ReceiptToggleProductComprisingBody {
  receiptId: string
  productId: string
}

export interface ChangeReceiptTitleBody {
  receiptId: string
  newTitle: string
}

export interface AddReceiptContributorBody {
  receiptId: string
  username: string
}

export interface RemoveReceiptContributorBody
  extends AddReceiptContributorBody {}

export interface UpdateReceiptProductBody {
  receiptId: string
  productId: string
  product: {
    name: string
    price: number
    count: number
  }
}

import { createContext, useContext } from 'react'
import { receiptMockup } from 'src/mockups/receipt'

export const ReceiptContext = createContext({ receipt: receiptMockup })

export function useReceiptContext() {
  const context = useContext(ReceiptContext)

  return context
}

const ReceiptContextProvider = ReceiptContext.Provider

export default ReceiptContextProvider

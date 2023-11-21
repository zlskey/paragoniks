import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { Profile, Receipt } from 'src/types/generic.types'
import {
  getContributors,
  getReceipt,
} from 'src/helpers/services/endpoints/receipt/receipt.service'
import { useNavigate, useParams } from 'react-router-dom'

import ReceiptSkeleton from 'src/pages/receipt/receipt.skeleton'
import { dummyReceipt } from 'src/helpers/mocks'
import { useQuery } from '@tanstack/react-query'

interface ReceiptContextValue {
  receipt: Receipt
  contributors: Profile[]
}

export const ReceiptContext = createContext<ReceiptContextValue>({
  receipt: dummyReceipt,
  contributors: [],
})

const ReceiptContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { receiptId } = useParams()

  const navigate = useNavigate()

  if (!receiptId) {
    navigate('/')
    return
  }

  const receiptResult = useQuery({
    queryKey: ['receipt', { receiptId }],
    queryFn: () => getReceipt({ receiptId }),
  })

  const contributorsResult = useQuery({
    queryKey: ['receipt', { receiptId }, 'contributors'],
    queryFn: () => getContributors({ receiptId }),
  })

  const isLoading = receiptResult.isLoading || contributorsResult.isLoading

  if (isLoading) {
    return <ReceiptSkeleton />
  }

  return (
    <ReceiptContext.Provider
      value={{
        receipt: receiptResult.data || dummyReceipt,
        contributors: contributorsResult.data || [],
      }}
    >
      {children}
    </ReceiptContext.Provider>
  )
}

export const useReceiptContext = () => {
  const receiptContext = useContext(ReceiptContext)

  return receiptContext
}

export default ReceiptContextProvider

import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { Profile, Receipt } from 'src/types/generic.types'
import {
  getContributors,
  getReceipt,
} from 'src/helpers/api/endpoints/receipt/receipt.api'
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
    refetchInterval: 2000,
  })

  const contributorsResult = useQuery({
    queryKey: ['receipt', { receiptId }, 'contributors'],
    queryFn: () => getContributors({ receiptId }),
    refetchInterval: 10000,
  })

  const isLoading = receiptResult.isLoading || contributorsResult.isLoading

  if (isLoading || !receiptResult.data?._id) {
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

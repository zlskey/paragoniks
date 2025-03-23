import { Product, Receipt } from 'src/app/generic.types'
import { PropsWithChildren, createContext, useContext } from 'react'

interface PreciseProductEditContextValue {
  product: Product
  receipt: Receipt
}

const PreciseProductEditContext =
  createContext<PreciseProductEditContextValue | null>(null)

function PreciseProductEditProvider({
  children,
  product,
  receipt,
}: PropsWithChildren<PreciseProductEditContextValue>) {
  return (
    <PreciseProductEditContext.Provider value={{ product, receipt }}>
      {children}
    </PreciseProductEditContext.Provider>
  )
}

function usePreciseProductEditContext() {
  const preciseProductEditContext = useContext(PreciseProductEditContext)

  if (!preciseProductEditContext) {
    throw new Error(
      'usePreciseProductEditContext must be used within a PreciseProductEditProvider'
    )
  }

  return preciseProductEditContext
}

export { usePreciseProductEditContext }
export default PreciseProductEditProvider

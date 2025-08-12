import { getUserReceipts } from '@api/endpoints/receipt/receipt.api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

function useUserReceipts() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['receipt'],
    queryFn: getUserReceipts,
    initialData: [],
    refetchInterval: 2000,
  })

  const { data: receipts } = query

  useEffect(() => {
    for (const receipt of receipts) {
      queryClient.setQueryData(['receipt', receipt._id], receipt)
    }
  }, [receipts])

  return query
}

export default useUserReceipts

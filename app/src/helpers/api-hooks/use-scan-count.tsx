import { getScanCount } from '@api/endpoints/scanCount/scanCount.api'
import { useQuery } from '@tanstack/react-query'

function useScanCount() {
  return useQuery({
    queryKey: ['scanCount'],
    queryFn: getScanCount,
    placeholderData: {
      scansLeft: 0,
      expirationDate: null,
    },
  })
}

export default useScanCount

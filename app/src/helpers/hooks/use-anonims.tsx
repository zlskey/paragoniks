import { getAllAnonims } from '@api/endpoints/anonim/anonim.api'
import { useQuery } from '@tanstack/react-query'

function useAnonims() {
  const { data, isLoading } = useQuery({
    queryKey: ['anonims', 'all'],
    queryFn: getAllAnonims,
  })

  return { anonims: data ?? [], isLoading }
}

export default useAnonims

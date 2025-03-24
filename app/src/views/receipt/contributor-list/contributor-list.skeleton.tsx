import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import { Skeleton } from 'moti/skeleton'
import { getPx } from 'src/app/styles'

function ContributorListSkeleton() {
  return (
    <Flex direction="column" spacing={0.5} alignContent="stretch">
      <Typography variant="subtitle2">Podzielone między • 3</Typography>

      <Paper styles={{ overflow: 'hidden' }}>
        <Flex direction="column" alignContent="stretch" spacing={0.5} p={0.5}>
          <Flex justifyContent="space-between" alignContent="center" p={1}>
            <Flex alignContent="center" spacing={1}>
              <Skeleton width={getPx(4)} height={getPx(4)} />
              <Skeleton width={getPx(14)} height={getPx(1.5)} />
            </Flex>

            <Skeleton width={getPx(4)} height={getPx(1.5)} />
          </Flex>
          <Flex justifyContent="space-between" alignContent="center" p={1}>
            <Flex alignContent="center" spacing={1}>
              <Skeleton width={getPx(4)} height={getPx(4)} />
              <Skeleton width={getPx(14)} height={getPx(1.5)} />
            </Flex>

            <Skeleton width={getPx(4)} height={getPx(1.5)} />
          </Flex>
          <Flex justifyContent="space-between" alignContent="center" p={1}>
            <Flex alignContent="center" spacing={1}>
              <Skeleton width={getPx(4)} height={getPx(4)} />
              <Skeleton width={getPx(14)} height={getPx(1.5)} />
            </Flex>

            <Skeleton width={getPx(4)} height={getPx(1.5)} />
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  )
}

export default ContributorListSkeleton

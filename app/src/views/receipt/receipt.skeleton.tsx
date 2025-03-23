import ContributorListSkeleton from './contributor-list/contributor-list.skeleton'
import Flex from '@components/flex'
import Paper from '@components/paper'
import { Skeleton } from 'moti/skeleton'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { getPx } from 'src/app/styles'

function ReceiptSkeleton() {
  return (
    <Wrapper>
      <Flex direction='column' spacing={2} alignContent='stretch'>
        <ContributorListSkeleton />
        <ProductListSkeleton />
      </Flex>
    </Wrapper>
  )
}

function ProductListSkeleton() {
  return (
    <Flex direction='column' spacing={0.5} alignContent='stretch'>
      <Typography variant='subtitle2'>Produkty</Typography>

      <Paper>
        <Flex direction='column' alignContent='stretch' p={0.5} spacing={0.5}>
          <Paper>
            <Flex direction='column' alignContent='stretch' p={1} spacing={0.5}>
              <Flex justifyContent='space-between' nativeFlex>
                <Flex nativeFlex>
                  <Skeleton width={getPx(7)} height={getPx(1.5)} />
                </Flex>

                <Skeleton width={getPx(4)} height={getPx(1.5)} />
              </Flex>

              <Flex justifyContent='space-between'>
                <Skeleton width={getPx(4)} height={getPx(1.2)} />

                <Flex spacing={-0.6}>
                  <Skeleton width={getPx(1.8)} height={getPx(1.8)} />
                </Flex>
              </Flex>
            </Flex>
          </Paper>
          <Paper>
            <Flex direction='column' alignContent='stretch' p={1} spacing={0.5}>
              <Flex justifyContent='space-between' nativeFlex>
                <Flex nativeFlex>
                  <Skeleton width={getPx(7)} height={getPx(1.5)} />
                </Flex>

                <Skeleton width={getPx(4)} height={getPx(1.5)} />
              </Flex>

              <Flex justifyContent='space-between'>
                <Skeleton width={getPx(4)} height={getPx(1.2)} />

                <Flex spacing={-0.6}>
                  <Skeleton width={getPx(1.8)} height={getPx(1.8)} />
                </Flex>
              </Flex>
            </Flex>
          </Paper>
          <Paper>
            <Flex direction='column' alignContent='stretch' p={1} spacing={0.5}>
              <Flex justifyContent='space-between' nativeFlex>
                <Flex nativeFlex>
                  <Skeleton width={getPx(7)} height={getPx(1.5)} />
                </Flex>

                <Skeleton width={getPx(4)} height={getPx(1.5)} />
              </Flex>

              <Flex justifyContent='space-between'>
                <Skeleton width={getPx(4)} height={getPx(1.2)} />

                <Flex spacing={-0.6}>
                  <Skeleton width={getPx(1.8)} height={getPx(1.8)} />
                </Flex>
              </Flex>
            </Flex>
          </Paper>
          <Paper>
            <Flex direction='column' alignContent='stretch' p={1} spacing={0.5}>
              <Flex justifyContent='space-between' nativeFlex>
                <Flex nativeFlex>
                  <Skeleton width={getPx(7)} height={getPx(1.5)} />
                </Flex>

                <Skeleton width={getPx(4)} height={getPx(1.5)} />
              </Flex>

              <Flex justifyContent='space-between'>
                <Skeleton width={getPx(4)} height={getPx(1.2)} />

                <Flex spacing={-0.6}>
                  <Skeleton width={getPx(1.8)} height={getPx(1.8)} />
                </Flex>
              </Flex>
            </Flex>
          </Paper>
          <Paper>
            <Flex direction='column' alignContent='stretch' p={1} spacing={0.5}>
              <Flex justifyContent='space-between' nativeFlex>
                <Flex nativeFlex>
                  <Skeleton width={getPx(7)} height={getPx(1.5)} />
                </Flex>

                <Skeleton width={getPx(4)} height={getPx(1.5)} />
              </Flex>

              <Flex justifyContent='space-between'>
                <Skeleton width={getPx(4)} height={getPx(1.2)} />

                <Flex spacing={-0.6}>
                  <Skeleton width={getPx(1.8)} height={getPx(1.8)} />
                </Flex>
              </Flex>
            </Flex>
          </Paper>
        </Flex>
      </Paper>
    </Flex>
  )
}

export default ReceiptSkeleton

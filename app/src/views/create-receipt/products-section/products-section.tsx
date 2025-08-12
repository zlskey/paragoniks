import type { CreateReceiptFormState } from '../create-receipt-form'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import useScanCount from '@helpers/api-hooks/use-scan-count'
import { useFormContext } from 'react-hook-form'
import GenerateOrFillSwitch from './generate-or-fill-switch/generate-or-fill-switch'
import ManualAddProductList from './manual-add-product-list'

function getPolishPlural(count: number) {
  switch (count) {
    case 1:
      return 'paragon'
    case 2:
    case 3:
    case 4:
      return 'paragony'
    default:
      return 'paragonów'
  }
}

function ProductsSection() {
  const formContext = useFormContext<CreateReceiptFormState>()
  const { data } = useScanCount()

  const shouldGenerateProducts = formContext.watch('shouldGenerateProducts')
  const expirationDate = data?.expirationDate ? new Date(data.expirationDate) : null

  return (
    <Flex direction="column" alignContent="stretch">
      <Typography>Produkty</Typography>

      <Flex direction="column" alignContent="stretch" spacing={1}>
        <GenerateOrFillSwitch />

        <Paper>
          {shouldGenerateProducts && (
            <Flex direction="column" alignContent="stretch" p={1}>
              <Typography variant="base2">
                Produkty zostaną wygenerowane na podstawie załączonego zdjęcia paragonu
              </Typography>

            </Flex>
          )}
          {!shouldGenerateProducts && <ManualAddProductList />}
        </Paper>
        {shouldGenerateProducts && (
          <Flex direction="column" alignContent="stretch" spacing={1}>
            <Typography variant="base2">
              Możesz zeskanować jeszcze
              {' '}
              {data?.scansLeft}
              {' '}
              {getPolishPlural(data?.scansLeft ?? 0)}
            </Typography>
            {expirationDate && (
              <Typography variant="base2">
                Możliwość zeskanowania paragonów odnowi się:
                {' '}
                {expirationDate.toLocaleDateString('pl-PL', {
                  day: '2-digit',
                  month: 'long',
                })}
                {' '}
                o
                {' '}
                {expirationDate.toLocaleTimeString('pl-PL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default ProductsSection

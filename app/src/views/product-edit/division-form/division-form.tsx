import type { PreciseEditFormValues } from 'src/views/product-edit/product-edit'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import useProfiles from '@helpers/hooks/use-profiles'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { usePreciseProductEditContext } from 'src/views/product-edit/product-edit.context'
import DivisionSwitch from './division-switch'
import useDivision from './use-division'
import UserItem from './user-item'

function DivisionForm() {
  const form = useFormContext<PreciseEditFormValues>()
  const { receipt, product } = usePreciseProductEditContext()
  const { profiles } = useProfiles(Object.keys(receipt.contributors))
  const {
    division,
    divisionType,
    onDivisionTypeChange,
    onDivisionValueChange,
    onDivisionCheckboxChange,
  } = useDivision(product)

  useEffect(() => {
    form.setValue('division', division)
    form.setValue('divisionType', divisionType)
  }, [division, divisionType, form.setValue])

  return (
    <Flex direction="column" alignContent="stretch" spacing={0.5}>
      <Flex justifyContent="space-between">
        <Typography variant="subtitle2">Podziel między</Typography>

        <DivisionSwitch
          divisionType={divisionType}
          onDivisionTypeChange={onDivisionTypeChange}
        />
      </Flex>

      <Paper styles={{ overflow: 'hidden' }}>
        <Flex direction="column" alignContent="stretch">
          {profiles.map(contributor => (
            <UserItem
              division={division}
              key={contributor._id}
              contributor={contributor}
              divisionType={divisionType}
              onDivisionValueChange={onDivisionValueChange}
              onDivisionCheckboxChange={onDivisionCheckboxChange}
            />
          ))}
        </Flex>
      </Paper>
    </Flex>
  )
}

export default DivisionForm

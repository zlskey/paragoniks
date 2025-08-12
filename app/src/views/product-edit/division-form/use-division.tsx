import type { DivisionType, Product } from 'src/app/generic.types'
import type { PreciseEditFormValues } from 'src/views/product-edit/product-edit'
import { getUniqueArray } from '@helpers/utils/array'
import { getEvenDivision, getNewDivision } from '@helpers/utils/division'
import { getTotalPrice } from '@helpers/utils/get-total-price'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

function getNumberToSplit(totalPrice: number, divisionType: DivisionType) {
  return divisionType === 'percentage' ? 100 : totalPrice
}

/**
 * @todo - refactor probably
 * @todo - add tests (xD)
 * @todo - refactor @helpers/utils/division as well...
 * @todo - make more todo's cause this is a mess
 */
function useDivision(product: Product) {
  const form = useFormContext<PreciseEditFormValues>()

  const [divisionUpdateStack, setDivisionUpdateStack] = useState<string[]>([])
  const [divisionType, setDivisionType] = useState(product.divisionType)
  const [division, setDivision] = useState(product.division)

  const price = form.watch('price')
  const count = form.watch('count')
  const discount = form.watch('discount')

  const totalPrice = useMemo(
    () => getTotalPrice({ price, count, discount }),
    [price, count, discount],
  )
  const numberToSplit = useMemo(
    () => getNumberToSplit(totalPrice, divisionType),
    [totalPrice, divisionType],
  )

  useEffect(() => {
    if (totalPrice === getTotalPrice(product)) {
      return
    }

    const newDivision = getEvenDivision({
      division,
      divisionType,
      numberToSplit,
    })

    setDivision(newDivision)
    setDivisionUpdateStack([])
  }, [totalPrice])

  const onDivisionCheckboxChange = useCallback(
    (profileId: string) => {
      const newDivision = getEvenDivision({
        division,
        divisionType,
        numberToSplit,
        userToToggle: profileId,
      })

      setDivision(newDivision)
      setDivisionUpdateStack([])
    },
    [division, divisionType, numberToSplit, setDivision, setDivision],
  )

  const onDivisionValueChange = useCallback(
    (profileId: string, value: string) => {
      const newDivisionUpdateStack = getUniqueArray([
        ...divisionUpdateStack,
        profileId,
      ])
      const divisionUpdateStackLength = newDivisionUpdateStack.length
      const divisionLength = Object.entries(division).filter(
        ([_, val]) => val !== null,
      ).length

      const ignoreUpdateStack = divisionUpdateStackLength === divisionLength
      if (ignoreUpdateStack) {
        setDivisionUpdateStack([])
      }
      else {
        setDivisionUpdateStack(newDivisionUpdateStack)
      }

      const newDivision = getNewDivision({
        division,
        divisionType,
        userId: profileId,
        newValue: Number.parseFloat(value),
        total: numberToSplit,
        divisionUpdateStack: ignoreUpdateStack ? [] : newDivisionUpdateStack,
      })

      setDivision(newDivision)
    },
    [division, divisionType, divisionUpdateStack, numberToSplit],
  )

  const onDivisionTypeChange = (newDivisionType: DivisionType) => {
    const newDivision = getEvenDivision({
      division,
      divisionType: newDivisionType,
      numberToSplit: getNumberToSplit(totalPrice, newDivisionType),
    })
    setDivisionUpdateStack([])
    setDivisionType(newDivisionType)
    setDivision(newDivision)
  }

  return {
    division,
    divisionType,
    onDivisionCheckboxChange,
    onDivisionValueChange,
    onDivisionTypeChange,
  }
}

export default useDivision

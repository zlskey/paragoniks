import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { DivisionType } from 'src/app/generic.types'
import type { PreciseEditFormValues } from 'src/views/product-edit/product-edit'
import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import SplitByDrawer from './split-by-drawer'

function useSplitByDrawer(
  onDivisionTypeChange: (newDivisionType: DivisionType) => void,
) {
  const form = useFormContext<PreciseEditFormValues>()
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  function expandDrawer() {
    bottomSheetRef.current?.present()
  }

  function collapseDrawer() {
    bottomSheetRef.current?.collapse()
  }

  const divisionType = form.watch('divisionType')

  const drawerComponent = (
    <SplitByDrawer
      onChangeDivisionType={onDivisionTypeChange}
      bottomSheetRef={bottomSheetRef}
      divisionType={divisionType}
    />
  )

  return { bottomSheetRef, drawerComponent, expandDrawer, collapseDrawer }
}

export default useSplitByDrawer

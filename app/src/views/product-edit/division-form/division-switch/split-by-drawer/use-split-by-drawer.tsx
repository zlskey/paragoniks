import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { DivisionType } from 'src/app/generic.types'
import { PreciseEditFormValues } from 'src/views/product-edit/product-edit'
import SplitByDrawer from './split-by-drawer'
import { useFormContext } from 'react-hook-form'
import { useRef } from 'react'

function useSplitByDrawer(
  onDivisionTypeChange: (newDivisionType: DivisionType) => void
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

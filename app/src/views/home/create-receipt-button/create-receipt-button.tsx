import { colors, getPx } from '@app/styles'
import Button from '@components/button'
import { useDrawerFunctions } from '@components/drawer'
import { FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import CreateReceiptDrawer from './create-receipt-drawer'

function CreateReceiptButton() {
  const ref = useDrawerFunctions()

  return (
    <>
      <Button
        small
        onPress={() => ref.current?.present()}
        style={{ backgroundColor: colors.paper, borderRadius: getPx(5) }}
        startIcon={
          <FontAwesome6 name="add" size={getPx(1.5)} color={colors.text} />
        }
      >
        Dodaj
      </Button>
      <CreateReceiptDrawer drawerRef={ref} />
    </>
  )
}

export default CreateReceiptButton

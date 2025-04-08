import SwipeableAction from '@components/swipeable-action'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { getPx } from 'src/app/styles'

function RemoveReceiptAction() {
  return (
    <SwipeableAction
      color="red"
      label="Usuń"
      endIcon={
        <MaterialIcons name="delete-outline" size={getPx(2)} color="white" />
      }
    />
  )
}

export default RemoveReceiptAction

import SwipeableAction from '@components/swipeable-action'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { getPx } from 'src/app/styles'

function RemoveProductAction() {
  return (
    <SwipeableAction
      color="red"
      label="Usuń"
      endIcon={<AntDesign name="edit" size={getPx(2)} color="white" />}
    />
  )
}

export default RemoveProductAction

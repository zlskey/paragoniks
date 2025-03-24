import SwipeableAction from '@components/swipeable-action'
import { MaterialIcons } from '@expo/vector-icons'
import { getPx } from 'src/app/styles'

function RemoveAnonimButton() {
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

export default RemoveAnonimButton

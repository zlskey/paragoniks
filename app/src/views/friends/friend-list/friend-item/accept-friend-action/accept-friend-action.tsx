import SwipeableAction from '@components/swipeable-action'
import { AntDesign } from '@expo/vector-icons'
import { getPx } from 'src/app/styles'

function AcceptFriendAction() {
  return (
    <SwipeableAction
      left
      color="blue"
      label="Przyjmij"
      endIcon={<AntDesign name="checkcircleo" size={getPx(2)} color="white" />}
    />
  )
}

export default AcceptFriendAction

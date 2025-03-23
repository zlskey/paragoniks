import { AntDesign } from '@expo/vector-icons'
import SwipeableAction from '@components/swipeable-action'
import { getPx } from 'src/app/styles'

function AcceptFriendAction() {
  return (
    <SwipeableAction
      color='red'
      label='Odrzuć'
      endIcon={<AntDesign name='closecircleo' size={getPx(2)} color='white' />}
    />
  )
}

export default AcceptFriendAction

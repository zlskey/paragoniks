import { AntDesign } from '@expo/vector-icons'
import SwipeableAction from '@components/swipeable-action'
import { getPx } from 'src/app/styles'

function RemoveContributorAction() {
  return (
    <SwipeableAction
      color='red'
      label='Usuń'
      endIcon={<AntDesign name='edit' size={getPx(2)} color='white' />}
    />
  )
}

export default RemoveContributorAction

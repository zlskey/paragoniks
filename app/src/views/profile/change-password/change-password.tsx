import { colors, getPx } from 'src/app/styles'

import Flex from '@components/flex'
import { FontAwesome5 } from '@expo/vector-icons'
import Paper from '@components/paper'
import { TouchableOpacity } from 'react-native'
import Typography from '@components/typography'
import { router } from 'expo-router'

function ChangePassword() {
  function redirectToChangePassword() {
    router.push('/profile/change-password')
  }

  return (
    <TouchableOpacity onPress={redirectToChangePassword}>
      <Paper>
        <Flex p={1.5} spacing={1} alignContent='center'>
          <FontAwesome5 name='edit' size={getPx(3)} color={colors.primary} />
          <Typography styles={{ color: colors.primary }} variant='subtitle2'>
            Zmień hasło
          </Typography>
        </Flex>
      </Paper>
    </TouchableOpacity>
  )
}

export default ChangePassword

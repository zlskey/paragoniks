import Flex from '@components/flex'

import Paper from '@components/paper'
import Typography from '@components/typography'
import { FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { colors, getPx } from 'src/app/styles'

function ChangePassword() {
  function redirectToChangePassword() {
    router.push('/profile/change-password')
  }

  return (
    <TouchableOpacity onPress={redirectToChangePassword}>
      <Paper>
        <Flex p={1.5} spacing={1} alignContent="center">
          <FontAwesome5 name="edit" size={getPx(3)} color={colors.primary} />
          <Typography styles={{ color: colors.primary }} variant="subtitle2">
            Zmień hasło
          </Typography>
        </Flex>
      </Paper>
    </TouchableOpacity>
  )
}

export default ChangePassword

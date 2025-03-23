import { colors, getPx } from 'src/app/styles'

import Flex from '@components/flex'
import { MaterialIcons } from '@expo/vector-icons'
import Paper from '@components/paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Typography from '@components/typography'
import useLogoutMutation from './use-logout-mutation'

function Logout() {
  const handleLogout = useLogoutMutation()

  return (
    <TouchableOpacity onPress={() => handleLogout({})}>
      <Paper styles={{ marginTop: 2 }}>
        <Flex p={1.5} spacing={1} alignContent='center'>
          <MaterialIcons name='logout' size={getPx(3)} color={colors.red} />
          <Typography styles={{ color: colors.red }} variant='subtitle2'>
            Wyloguj się
          </Typography>
        </Flex>
      </Paper>
    </TouchableOpacity>
  )
}

export default Logout

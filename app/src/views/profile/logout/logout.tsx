import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { getPx } from 'src/app/styles'
import useLogoutMutation from './use-logout-mutation'

function Logout() {
  const { colors } = useTheme()
  const handleLogout = useLogoutMutation()

  return (
    <TouchableOpacity onPress={() => handleLogout({})}>
      <Paper styles={{ marginTop: 2 }}>
        <Flex p={1.5} spacing={1} alignContent="center">
          <MaterialIcons name="logout" size={getPx(3)} color={colors.error} />
          <Typography styles={{ color: colors.error }} variant="subtitle2">
            Wyloguj się
          </Typography>
        </Flex>
      </Paper>
    </TouchableOpacity>
  )
}

export default Logout

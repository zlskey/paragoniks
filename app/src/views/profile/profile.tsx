import ChangePassword from './change-password'
import Flex from '@components/flex'
import Header from './header'
import Logout from './logout'
import Wrapper from '@components/wrapper'

function Profile() {
  return (
    <Wrapper>
      <Header />

      <Flex direction='column' mt={2} alignContent='stretch' spacing={2}>
        <ChangePassword />
        <Logout />
      </Flex>
    </Wrapper>
  )
}

export default Profile

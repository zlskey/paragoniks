import Flex from '@components/flex'
import Wrapper from '@components/wrapper'
import ChangePassword from './change-password'
import Header from './header'
import Logout from './logout'

function Profile() {
  return (
    <Wrapper>
      <Header />

      <Flex direction="column" mt={2} alignContent="stretch" spacing={2}>
        <ChangePassword />
        <Logout />
      </Flex>
    </Wrapper>
  )
}

export default Profile

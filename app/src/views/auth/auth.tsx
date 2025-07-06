import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import LoginForm from './login-form'
import SignupForm from './signup-form'

function Auth() {
  const [view, setView] = useState<'login' | 'signup'>('login')

  const onPress = () => {
    setView(view === 'login' ? 'signup' : 'login')
  }

  return (
    <Wrapper>
      <Flex
        direction="column"
        justifyContent="center"
        alignContent="stretch"
        nativeFlex
        spacing={1}
      >
        {view === 'login' ? <LoginForm /> : <SignupForm />}

        <TouchableOpacity onPress={onPress}>
          <Typography>
            {view === 'login' ? 'Zarejestruj się' : 'Zaloguj się'}
          </Typography>
        </TouchableOpacity>
      </Flex>
    </Wrapper>
  )
}

export default Auth

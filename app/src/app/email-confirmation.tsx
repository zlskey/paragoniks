import type { AxiosError } from 'axios'
import { confirmEmail } from '@api/endpoints/user/user.api'
import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useUserContext } from '@helpers/contexts/user.context'
import { useMutation } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { Image } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'

interface EmailConfirmationContentProps {
  isConfirmEmailPending: boolean
  confirmEmailError: AxiosError | null
}

function EmailConfirmationContent({ isConfirmEmailPending, confirmEmailError }: EmailConfirmationContentProps) {
  const { loggedIn } = useUserContext()

  if (isConfirmEmailPending) {
    return <ActivityIndicator size="large" />
  }

  if (confirmEmailError) {
    return (
      <>
        <Flex
          spacing={1}
          direction="column"
          alignContent="center"
        >
          <Typography variant="display" styles={{ textAlign: 'center' }}>
            Wystąpił błąd
          </Typography>
          <Typography variant="subtitle2" styles={{ textAlign: 'center' }}>
            {/* @ts-expect-error - confirmEmailError is an AxiosError */}
            {confirmEmailError.response?.data?.error?.message ?? SOMETHING_WENT_WRONG_MESSAGE}
          </Typography>
        </Flex>

        <Button onPress={() => router.push(loggedIn ? '/' : '/a')}>
          {loggedIn ? 'Przejdź do Paragoniksa' : 'Przejdź do strony logowania'}
        </Button>
      </>
    )
  }

  return (
    <>
      <Flex
        spacing={1}
        direction="column"
        alignContent="center"
      >
        <Typography variant="display">
          Email został potwierdzony
        </Typography>
        <Typography variant="subtitle2" styles={{ textAlign: 'center' }}>
          Twoje konto zostało utworzone. Możesz teraz się zalogować.
        </Typography>
      </Flex>

      <Button onPress={() => router.push(loggedIn ? '/' : '/a')}>
        {loggedIn ? 'Przejdź do Paragoniksa' : 'Przejdź do strony logowania'}
      </Button>
    </>
  )
}

function EmailConfirmation() {
  const { h: hash, uid: accountId } = useLocalSearchParams()

  const {
    mutate: handleConfirmEmail,
    isPending: isConfirmEmailPending,
    error: confirmEmailError,
  } = useMutation({ mutationFn: confirmEmail })

  useEffect(() => {
    if (!hash || typeof hash !== 'string' || !accountId || typeof accountId !== 'string') {
      return
    }
    handleConfirmEmail({ hash, accountId })
  }, [handleConfirmEmail, hash])

  return (
    <Wrapper>
      <Flex
        alignContent="center"
        direction="column"
        nativeFlex
      >
        <Image
          source={require('@assets/images/adaptive-icon.png')}
          style={{ width: 80, height: 80 }}
        />

        <Flex
          flexGrow
          nativeFlex
          spacing={2}
          direction="column"
          alignContent="center"
          justifyContent="center"
        >
          <EmailConfirmationContent
            confirmEmailError={confirmEmailError as AxiosError}
            isConfirmEmailPending={isConfirmEmailPending}
          />
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default EmailConfirmation

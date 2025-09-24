import type { HandleUploadPayload } from '../components'
import type { AuthParams, SignupProfileFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AvatarPicker } from '../components'
import { useSignup } from '../hooks'
import { AUTH_LABELS, AUTH_MESSAGES, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function SignupProfile() {
  const { username, password, email } = useLocalSearchParams() as AuthParams
  const addNotification = useNotificationContext()
  const form = useForm<SignupProfileFormData>({ defaultValues: DEFAULT_FORM_VALUES.SIGNUP_PROFILE })
  const [avatar, setAvatar] = useState<HandleUploadPayload | null>(null)
  const { mutate: signup, isPending } = useSignup()

  function handleAvatarChange(newAvatar: HandleUploadPayload | null) {
    setAvatar(newAvatar)
  }

  function onSubmit(_data: SignupProfileFormData) {
    if (!username || !password) {
      addNotification(AUTH_MESSAGES.MISSING_REQUIRED_DATA, 'error')
      return
    }

    signup({
      username,
      password,
      email,
      avatarImage: avatar?.image ? `data:image/jpeg;base64,${avatar.image}` : '',
    })
  }

  return (
    <AuthWrapper
      title={AUTH_TITLES.SIGNUP}
      subtitle={AUTH_TITLES.SIGNUP_PROFILE_SUBTITLE}
    >
      <FormProvider {...form}>
        <AvatarPicker
          username={username}
          onAvatarChange={handleAvatarChange}
        />

        <AuthFooter
          rightButtonLabel={AUTH_LABELS.CREATE_ACCOUNT}
          rightButtonProps={{ loading: isPending }}
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default SignupProfile

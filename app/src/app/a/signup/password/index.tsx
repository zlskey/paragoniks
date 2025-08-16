import AuthFooter from '@components/auth-footer'
import AuthWrapper from '@components/auth-wrapper'
import TextField from '@components/text-field'
import { userSchema } from '@helpers/utils/password-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { router, useLocalSearchParams } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'

const defaultValues = {
  password: '',
  repeatPassword: '',
}

function SignupPassword() {
  const { username } = useLocalSearchParams<{ username: string }>()
  const form = useForm({
    defaultValues,
    resolver: yupResolver(userSchema.pick(['password', 'repeatPassword'])),
  })

  function onSubmit(data: typeof defaultValues) {
    // Navigate to profile page with username and password
    router.push({
      pathname: '/a/signup/profile',
      params: {
        username: username!,
        password: data.password,
      },
    })
  }

  return (
    <AuthWrapper title="Utwórz konto">
      <FormProvider {...form}>
        <TextField
          name="password"
          label="Hasło"
          secureTextEntry
          error={form.formState.errors.password}
        />

        <TextField
          name="repeatPassword"
          label="Powtórz hasło"
          secureTextEntry
          error={form.formState.errors.repeatPassword}
        />

        <AuthFooter
          rightButtonLabel="Dalej"
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default SignupPassword

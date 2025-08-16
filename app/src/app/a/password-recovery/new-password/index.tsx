import AuthFooter from '@components/auth-footer'
import AuthWrapper from '@components/auth-wrapper'
import TextField from '@components/text-field'
import { userSchema } from '@helpers/utils/password-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'

const defaultValues = {
  password: '',
  repeatPassword: '',
}

function NewPassword() {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(userSchema.pick(['password', 'repeatPassword'])),
  })

  function onSubmit(data: typeof defaultValues) {
    // TODO: Implement password update logic
    console.log('New password:', data.password)
    // After successful password update, redirect to login
    router.replace('/a/login')
  }

  return (
    <AuthWrapper
      title="Ustaw nowe hasło"
      subtitle="Wybierz nowe hasło dla swojego konta."
    >
      <FormProvider {...form}>
        <TextField
          name="password"
          label="Nowe hasło"
          secureTextEntry
          error={form.formState.errors.password}
        />

        <TextField
          name="repeatPassword"
          label="Powtórz nowe hasło"
          secureTextEntry
          error={form.formState.errors.repeatPassword}
        />

        <AuthFooter
          rightButtonLabel="Ustaw hasło"
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default NewPassword

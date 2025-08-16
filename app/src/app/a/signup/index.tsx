import AuthFooter from '@components/auth-footer'
import AuthWrapper from '@components/auth-wrapper'
import UsernameTextField from '@components/username-text-field'
import { router } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'

const defaultValues = {
  username: '',
}

function Signup() {
  const form = useForm({ defaultValues })

  function onSubmit(data: typeof defaultValues) {
    router.push({
      pathname: '/a/signup/password',
      params: { username: data.username },
    })
  }

  return (
    <AuthWrapper title="Utwórz konto">
      <FormProvider {...form}>
        <UsernameTextField
          name="username"
          label="Nazwa użytkownika"
          error={form.formState.errors.username}
        />

        <AuthFooter
          rightButtonLabel="Dalej"
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default Signup

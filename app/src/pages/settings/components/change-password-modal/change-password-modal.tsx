import * as yup from 'yup'

import { FormProvider, useForm } from 'react-hook-form'

import { LoadingButton } from '@mui/lab'
import PasswordTextField from 'src/components/password-text-field/password-text-field'
import SettingsModal from '../settings-modal'
import { Stack } from '@mui/material'
import { Trans } from '@lingui/macro'
import { changePassword } from 'src/helpers/api/endpoints/user/user.api'
import { passwordSchema } from 'src/helpers/utils/user-validation-schema'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  currentPassword: '',
  password: '',
  repeatPassword: '',
}

const currentPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Old password is required'),
})

const ChangePasswordModal = () => {
  const navigate = useNavigate()

  const formState = useForm({
    defaultValues,
    resolver: yupResolver(currentPasswordSchema.concat(passwordSchema)),
  })

  const {
    mutate: handleChangePassword,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ['user', 'password'],
    mutationFn: changePassword,
    onSuccess: () => {
      formState.reset()
      navigate('#')
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        formState.setError('currentPassword', {
          type: 'manual',
          message: err.response.data.error.message,
        })
      }
    },
  })

  const getFieldErrorMessage = (name: keyof typeof defaultValues) => {
    return formState.formState.errors[name]?.message || ''
  }

  return (
    <SettingsModal id='password' title={<Trans>Change password</Trans>}>
      <form
        onSubmit={formState.handleSubmit(({ password, currentPassword }) =>
          handleChangePassword({
            newPassword: password,
            currentPassword,
          })
        )}
      >
        <FormProvider {...formState}>
          <Stack spacing={2}>
            <PasswordTextField
              label={<Trans>Current password</Trans>}
              name='currentPassword'
              isFailed={
                Boolean(getFieldErrorMessage('currentPassword')) || isError
              }
              errorMessage={getFieldErrorMessage('currentPassword')}
            />

            <PasswordTextField
              label={<Trans>New password</Trans>}
              name='password'
              isFailed={Boolean(getFieldErrorMessage('password')) || isError}
              errorMessage={getFieldErrorMessage('password')}
            />

            <PasswordTextField
              label={<Trans>Repeat new password</Trans>}
              name='repeatPassword'
              isFailed={
                Boolean(getFieldErrorMessage('repeatPassword')) || isError
              }
              errorMessage={getFieldErrorMessage('repeatPassword')}
            />

            <Stack direction='row' justifyContent='flex-end'>
              <LoadingButton
                disabled={isPending}
                loading={isPending}
                variant='contained'
                type='submit'
              >
                <Trans>Confirm</Trans>
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </form>
    </SettingsModal>
  )
}

export default ChangePasswordModal

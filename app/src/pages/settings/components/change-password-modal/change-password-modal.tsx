import * as yup from 'yup'

import { FormProvider, useForm } from 'react-hook-form'
import {
  selectUserError,
  selectUserLoading,
} from 'src/helpers/reducers/user/user.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { LoadingButton } from '@mui/lab'
import PasswordTextField from 'src/components/password-text-field/password-text-field'
import SettingsModal from '../settings-modal'
import { Stack } from '@mui/material'
import { Trans } from '@lingui/macro'
import { changePassword } from 'src/helpers/reducers/user/user.thunk'
import { passwordSchema } from 'src/helpers/utils/user-validation-schema'
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
  const dispatch = useAppDispatch()

  const error = useAppSelector(selectUserError)

  const isLoading = useAppSelector(selectUserLoading) === 'pending'

  const navigate = useNavigate()

  const formState = useForm({
    defaultValues,
    resolver: yupResolver(currentPasswordSchema.concat(passwordSchema)),
  })

  const onSubmit = ({
    currentPassword,
    password: newPassword,
  }: typeof defaultValues) => {
    dispatch(changePassword({ currentPassword, newPassword }))
    formState.reset()
    navigate('#')
  }

  const getFieldErrorMessage = (name: keyof typeof defaultValues) => {
    return formState.formState.errors[name]?.message || ''
  }

  return (
    <SettingsModal id='password' title={<Trans>Change password</Trans>}>
      <form onSubmit={formState.handleSubmit(onSubmit)}>
        <FormProvider {...formState}>
          <Stack spacing={2}>
            <PasswordTextField
              label={<Trans>Current password</Trans>}
              name='currentPassword'
              isFailed={
                Boolean(getFieldErrorMessage('currentPassword')) || !!error
              }
              errorMessage={getFieldErrorMessage('currentPassword')}
            />

            <PasswordTextField
              label={<Trans>New password</Trans>}
              name='password'
              isFailed={Boolean(getFieldErrorMessage('password')) || !!error}
              errorMessage={getFieldErrorMessage('password')}
            />

            <PasswordTextField
              label={<Trans>Repeat new password</Trans>}
              name='repeatPassword'
              isFailed={
                Boolean(getFieldErrorMessage('repeatPassword')) || !!error
              }
              errorMessage={getFieldErrorMessage('repeatPassword')}
            />

            <Stack direction='row' justifyContent='flex-end'>
              <LoadingButton
                disabled={isLoading}
                loading={isLoading}
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

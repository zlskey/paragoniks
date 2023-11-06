import { InputBase, Paper, Stack, Typography } from '@mui/material'

import { TIleInputProps } from './tile-input.types'
import { changeReceiptTitle } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const TitleInput = ({ receipt, user }: TIleInputProps) => {
  const formState = useForm({ defaultValues: { title: '' } })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (receipt) {
      formState.setValue('title', receipt.title)
    }
  }, [receipt])

  const handleChangeTitle = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const { value } = event.target
    formState.clearErrors()

    if (value === receipt.title) {
      return
    }

    if (!value) {
      formState.setValue('title', receipt.title)
      formState.setError('title', { message: 'Title is required' })
      return
    }

    dispatch(
      changeReceiptTitle({
        receiptId: receipt._id,
        newTitle: value,
      })
    )
  }

  return (
    <Paper>
      <Stack p={1}>
        <InputBase
          sx={{ fontSize: theme => theme.typography.h5 }}
          disabled={user.username !== receipt.owner}
          spellCheck={false}
          {...formState.register('title', {
            onBlur: handleChangeTitle,
          })}
        />
        <Typography color='red'>
          {formState.formState?.errors?.title?.message}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default TitleInput

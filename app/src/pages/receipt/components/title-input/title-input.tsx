import * as yup from 'yup'

import { InputBase, Paper, Stack, Typography } from '@mui/material'

import { TIleInputProps } from './tile-input.types'
import { changeReceiptTitle } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  title: '',
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Receipt title is required')
    .min(3, 'Receipt title must be at least 3 characters')
    .max(30, 'Receipt title must be at most 30 characters'),
})

const TitleInput = ({ receipt, user }: TIleInputProps) => {
  const formState = useForm({ defaultValues, resolver: yupResolver(schema) })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (receipt) {
      formState.setValue('title', receipt.title)
    }
  }, [receipt])

  const handleSubmit = (data: typeof defaultValues) => {
    dispatch(
      changeReceiptTitle({
        receiptId: receipt._id,
        newTitle: data.title,
      })
    )
  }

  const handleChangeTitle = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const { value } = event.target

    if (value === '') {
      formState.setValue('title', receipt.title)
      return
    }

    if (value === receipt.title) {
      return
    }

    formState.handleSubmit(handleSubmit)()
  }

  return (
    <Paper>
      <Stack p={1}>
        <InputBase
          sx={{ fontSize: theme => theme.typography.h5 }}
          disabled={user._id !== receipt.owner}
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

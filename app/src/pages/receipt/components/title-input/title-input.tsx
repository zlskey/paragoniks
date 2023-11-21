import * as yup from 'yup'

import { InputBase, Paper, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { changeReceiptTitle } from 'src/helpers/services/endpoints/receipt/receipt.service'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'
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

const TitleInput = () => {
  const { receipt } = useReceiptContext()
  const user = useUser()

  const formState = useForm({ defaultValues, resolver: yupResolver(schema) })

  useEffect(() => {
    formState.setValue('title', receipt.title)
  }, [receipt])

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['receipt', { receiptId: receipt._id }],
    mutationFn: changeReceiptTitle,
    onSuccess: data => {
      queryClient.setQueryData(['receipt', { receiptId: receipt._id }], data)
    },
  })

  const handleSubmit = (data: typeof defaultValues) => {
    mutate({
      receiptId: receipt._id,
      newTitle: data.title,
    })
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

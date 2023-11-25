import { Button, Paper, Stack, Typography, styled } from '@mui/material'
import { useForm, useWatch } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import AttachIcon from '@mui/icons-material/AttachFileOutlined'
import ConfirmIcon from '@mui/icons-material/CheckOutlined'
import { LoadingButton } from '@mui/lab'
import { Receipt } from 'src/types/generic.types'
import RemoveIcon from '@mui/icons-material/DeleteForeverOutlined'
import { Trans } from '@lingui/macro'
import { createReceipt } from 'src/helpers/api/endpoints/receipt/receipt.api'

const defaultValues = {
  file: null,
}

const UploadReceipt = () => {
  const formState = useForm({ defaultValues })

  const fileList = useWatch({ name: 'file', control: formState.control })

  const queryClient = useQueryClient()

  const resetForm = () => formState.reset()

  const { mutate: handleCreateReceipt, isPending } = useMutation({
    mutationKey: ['receipt'],
    mutationFn: async () => {
      if (!fileList) return null

      return createReceipt({
        image: fileList[0],
      })
    },
    onError: (err: any) => {
      if (err?.response?.status === 429) {
        formState.setError('file', {
          type: 'manual',
          message: 'Limit of 2 receipts per 6 hours reached',
        })
      }
    },
    onSuccess: data => {
      resetForm()
      queryClient.setQueryData(['receipt'], (oldReceipts: Receipt[]) => [
        ...oldReceipts,
        data,
      ])
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['receipt'] })
    },
  })

  return (
    <Paper>
      <Stack p={2} gap={1}>
        <Typography variant='h5'>
          <Trans>Add new receipt</Trans>
        </Typography>

        {!fileList && (
          <Button
            component='label'
            variant='contained'
            startIcon={<AttachIcon />}
          >
            <Trans>Select image</Trans>
            <VisuallyHiddenInput
              {...formState.register('file')}
              accept='image/*'
              multiple={false}
              type='file'
            />
          </Button>
        )}

        {fileList && (
          <Stack direction='row' spacing={1}>
            <LoadingButton
              startIcon={<ConfirmIcon />}
              variant='contained'
              size='medium'
              onClick={() => handleCreateReceipt()}
              sx={{ flexGrow: 1 }}
              color='success'
              loading={isPending}
              disabled={isPending}
            >
              <Trans>Confirm</Trans>
            </LoadingButton>

            <LoadingButton
              startIcon={<RemoveIcon />}
              variant='contained'
              size='medium'
              onClick={resetForm}
              sx={{ flexGrow: 1 }}
              color='error'
              loading={isPending}
              disabled={isPending}
            >
              <Trans>Remove</Trans>
            </LoadingButton>
          </Stack>
        )}

        <Typography variant='body2' color='error'>
          {formState.formState.errors.file?.message}
        </Typography>
      </Stack>
    </Paper>
  )
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export default UploadReceipt

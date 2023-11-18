import { Button, Paper, Stack, Typography, styled } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'
import { useForm, useWatch } from 'react-hook-form'

import AttachIcon from '@mui/icons-material/AttachFileOutlined'
import ConfirmIcon from '@mui/icons-material/CheckOutlined'
import { LoadingButton } from '@mui/lab'
import RemoveIcon from '@mui/icons-material/DeleteForeverOutlined'
import { Trans } from '@lingui/macro'
import { createReceipt } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectReceiptLoading } from 'src/helpers/reducers/receipt/receipt.reducer'

const defaultValues = {
  file: null,
}

const UploadReceipt = () => {
  const formState = useForm({ defaultValues })

  const dispatch = useAppDispatch()

  const status = useAppSelector(selectReceiptLoading)

  const fileList = useWatch({ name: 'file', control: formState.control })

  const isLoading = status === 'pending'

  const resetForm = () => formState.reset()

  const handleCreateReceipt = () => {
    if (fileList) {
      dispatch(createReceipt({ image: fileList[0] }))
      resetForm()
    }
  }

  return (
    <Paper>
      <Stack p={2} gap={1}>
        <Typography variant='h5'>
          <Trans>Add new receipt</Trans>
        </Typography>

        {!fileList && (
          <LoadingButton
            component='label'
            variant='contained'
            startIcon={<AttachIcon />}
            loading={isLoading}
            disabled={isLoading}
          >
            <Trans>Select image</Trans>
            <VisuallyHiddenInput
              {...formState.register('file')}
              accept='image/png,image/jpg'
              multiple={false}
              type='file'
            />
          </LoadingButton>
        )}

        {fileList && (
          <Stack direction='row' spacing={1}>
            <Button
              startIcon={<ConfirmIcon />}
              variant='contained'
              size='medium'
              onClick={handleCreateReceipt}
              sx={{ flexGrow: 1 }}
              color='success'
            >
              <Trans>Confirm</Trans>
            </Button>

            <Button
              startIcon={<RemoveIcon />}
              variant='contained'
              size='medium'
              onClick={resetForm}
              sx={{ flexGrow: 1 }}
              color='error'
            >
              <Trans>Remove</Trans>
            </Button>
          </Stack>
        )}
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

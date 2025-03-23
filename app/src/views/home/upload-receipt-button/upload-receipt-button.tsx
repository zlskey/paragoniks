import { colors, getPx } from 'src/app/styles'

import Button from '@components/button'
import Feather from '@expo/vector-icons/Feather'
import useUploadImage from '@helpers/hooks/use-upload-image'
import useUploadReceipt from './use-upload-receipt'

function UploadReceiptButton() {
  const { mutate, isPending } = useUploadReceipt()
  const { handleUpload } = useUploadImage()

  async function handleUploadReceipt() {
    handleUpload(mutate)
  }

  return (
    <Button
      small
      isDisabled={isPending}
      onPress={handleUploadReceipt}
      style={{ backgroundColor: colors.paper, borderRadius: getPx(5) }}
      startIcon={
        <Feather name='upload' size={getPx(1.5)} color={colors.text} />
      }
    >
      Dodaj
    </Button>
  )
}

export default UploadReceiptButton

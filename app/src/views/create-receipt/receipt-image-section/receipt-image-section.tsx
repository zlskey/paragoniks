import type { ImageBase64 } from '@app/generic.types'
import type { CreateReceiptFormState } from '../create-receipt-form'
import { colors, getPx } from '@app/styles'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import useUploadImage from '@helpers/hooks/use-upload-image'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Dimensions, TouchableOpacity } from 'react-native'

function ReceiptImageSection() {
  const { width } = Dimensions.get('window')

  const createReceiptForm = useFormContext<CreateReceiptFormState>()
  const { handleUpload: uploadImage } = useUploadImage()

  const [fileName, setFileName] = useState('')

  function onUploadReceiptClick() {
    uploadImage(handleUploadReceipt)
  }

  function handleUploadReceipt({ fileName, image }: { fileName: string, image: ImageBase64 }) {
    setFileName(fileName)
    createReceiptForm.setValue('image', image)
  }

  function handleRemoveReceipt() {
    setFileName('')
    createReceiptForm.setValue('image', 'null')
  }

  return (
    <Flex direction="column" alignContent="stretch">
      <Typography>Zdjęcie paragonu</Typography>

      <Paper>
        <Flex p={0.5} alignContent="stretch" direction="column" spacing={0.5}>
          <TouchableOpacity onPress={onUploadReceiptClick}>
            <Paper>
              <Flex p={0.75} spacing={1} alignContent="center" styles={{ backgroundColor: colors.secondPaper }}>
                <AntDesign name="upload" size={getPx(3)} color={colors.text} />
                <Typography>
                  {fileName ? 'Zmień' : 'Dodaj'}
                  {' '}
                  zdjęcie paragonu
                </Typography>
              </Flex>
            </Paper>
          </TouchableOpacity>

          {fileName
            && (
              <Flex p={0.75} alignContent="center" justifyContent="space-between">
                <Flex spacing={1} alignContent="center">
                  <Ionicons name="receipt-outline" size={getPx(3)} color={colors.text} />
                  <Typography numberOfLines={1} ellipsizeMode="tail" styles={{ maxWidth: width * 0.69 }}>{fileName}</Typography>
                </Flex>

                <TouchableOpacity onPress={handleRemoveReceipt}>
                  <AntDesign name="delete" size={getPx(3)} color={colors.text} />
                </TouchableOpacity>
              </Flex>
            )}
        </Flex>
      </Paper>
    </Flex>
  )
}

export default ReceiptImageSection

import type { ImageBase64 } from '@paragoniks/shared'
import * as ImagePicker from 'expo-image-picker'

export interface HandleUploadPayload {
  image: ImageBase64
  fileName: string
}

function useUploadImage() {
  async function handleUpload(fun: (data: HandleUploadPayload) => any) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      quality: 1,
    })

    if (result.canceled) {
      return
    }

    const image = result.assets[0]

    if (!image.base64 || !image.fileName) {
      return
    }

    return fun({
      image: image.base64,
      fileName: image.fileName,
    })
  }

  return { handleUpload }
}

export default useUploadImage

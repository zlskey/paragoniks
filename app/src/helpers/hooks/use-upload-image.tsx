import type { ImageBase64 } from 'src/app/generic.types'

import * as ImagePicker from 'expo-image-picker'

function useUploadImage() {
  async function handleUpload(fun: (data: { image: ImageBase64, fileName: string }) => any) {
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

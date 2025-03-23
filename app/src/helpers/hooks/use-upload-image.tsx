import * as ImagePicker from 'expo-image-picker'

import { ImageBase64 } from 'src/app/generic.types'

function useUploadImage() {
  async function handleUpload(fun: (image: ImageBase64) => any) {
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

    if (!image.base64) {
      return
    }

    return fun(image.base64)
  }

  return { handleUpload }
}

export default useUploadImage

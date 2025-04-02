import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from 'src/app/styles'

interface GoBackIconProps {
  overWriteOnClick?: () => void
}

function GoBackIcon({ overWriteOnClick }: GoBackIconProps) {
  const router = useRouter()

  function goBack() {
    if (overWriteOnClick) {
      overWriteOnClick()
      return
    }

    if (router.canGoBack()) {
      router.back()
    }
  }

  return (
    <TouchableOpacity onPress={goBack}>
      <Ionicons name="arrow-back" size={24} color={colors.text} />
    </TouchableOpacity>
  )
}

export default GoBackIcon

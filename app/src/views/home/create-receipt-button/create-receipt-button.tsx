import { colors, getPx } from '@app/styles'
import Button from '@components/button'
import { FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'

function CreateReceiptButton() {
  const router = useRouter()

  return (
    <>
      <Button
        small
        onPress={() => router.push('/receipt/create')}
        style={{ backgroundColor: colors.paper, borderRadius: getPx(5) }}
        startIcon={
          <FontAwesome6 name="add" size={getPx(1.5)} color={colors.text} />
        }
      >
        Dodaj
      </Button>
    </>
  )
}

export default CreateReceiptButton

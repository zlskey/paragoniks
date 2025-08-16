import { getPx } from '@app/styles'
import Button from '@components/button'
import { FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'

function CreateReceiptButton() {
  const { colors } = useTheme()
  const router = useRouter()

  return (
    <>
      <Button
        small
        onPress={() => router.push('/receipt/create')}
        style={{ backgroundColor: colors.surface, borderRadius: getPx(5) }}
        startIcon={
          <FontAwesome6 name="add" size={getPx(1.5)} color={colors.onBackground} />
        }
      >
        Dodaj
      </Button>
    </>
  )
}

export default CreateReceiptButton

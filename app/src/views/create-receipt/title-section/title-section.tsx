import type { CreateReceiptFormState } from '../create-receipt-form'
import { getPx } from '@app/styles'
import Flex from '@components/flex'
import Paper from '@components/paper'
import TextField from '@components/text-field'
import Typography from '@components/typography'
import { FontAwesome5 } from '@expo/vector-icons'
import { useUserContext } from '@helpers/contexts/user.context'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTheme } from 'react-native-paper'

function TitleSection() {
  const formContext = useFormContext<CreateReceiptFormState>()
  const { user } = useUserContext()
  const { colors } = useTheme()

  useEffect(() => {
    formContext.setValue('title', `Paragon #${user.meta?.noOfReceipts ?? 1}`)
  }, [])

  return (
    <Flex direction="column" alignContent="stretch" spacing={1}>
      <TextField
        name="title"
        label="Tytuł paragonu"
        labelAlwaysOnTop
        error={formContext.formState.errors.title}
      />
      <Paper>
        <Flex p={0.5} pl={1} spacing={1} styles={{ backgroundColor: '#1976d2' }} alignContent="center">
          <FontAwesome5 name="info" size={getPx(2)} color={colors.onBackground} />
          <Typography variant="base2">
            Pozostawiony domyślny tytuł zostanie wygenerowany na podstawie produktów/zdjęcia paragonu
          </Typography>
        </Flex>
      </Paper>
    </Flex>
  )
}

export default TitleSection

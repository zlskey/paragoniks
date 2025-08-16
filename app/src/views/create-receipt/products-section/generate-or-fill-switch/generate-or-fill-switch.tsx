import type { CreateReceiptFormState } from '@views/create-receipt/create-receipt-form'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'

interface SwitchItemProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function SwitchItem({
  label,
  isActive,
  onClick,
}: SwitchItemProps) {
  const { colors } = useTheme()
  return (
    <Paper styles={{ flexGrow: 1 }}>
      <TouchableOpacity onPress={onClick}>
        <Flex
          styles={{ backgroundColor: isActive ? colors.surfaceVariant : undefined }}
          p={1}
          spacing={1}
          alignContent="center"
          direction="column"
        >
          <Typography>{label}</Typography>
        </Flex>
      </TouchableOpacity>
    </Paper>
  )
}

function GenerateOrFillSwitch() {
  const createReceiptForm = useFormContext<CreateReceiptFormState>()

  const formContext = useFormContext<CreateReceiptFormState>()
  const shouldGenerateProducts = formContext.watch('shouldGenerateProducts')
  const image = createReceiptForm.watch('image')

  useEffect(() => {
    if (image && image !== 'null') {
      formContext.setValue('shouldGenerateProducts', true, { shouldDirty: true })
    }
  }, [image])

  return (
    <Paper>
      <Flex p={0.5} justifyContent="space-around">
        <SwitchItem
          label="Uzupełnij produkty"
          isActive={!shouldGenerateProducts}
          onClick={() => formContext.setValue('shouldGenerateProducts', false, { shouldDirty: true })}
        />
        <SwitchItem
          label="Wygeneruj produkty"
          isActive={shouldGenerateProducts}
          onClick={() => formContext.setValue('shouldGenerateProducts', true, { shouldDirty: true })}
        />
      </Flex>
    </Paper>
  )
}

export default GenerateOrFillSwitch

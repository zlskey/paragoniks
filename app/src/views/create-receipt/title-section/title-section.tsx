import type { CreateReceiptFormState } from '../create-receipt-form'
import { colors, getPx } from '@app/styles'
import Flex from '@components/flex'
import Paper from '@components/paper'
import TextField from '@components/text-field'
import Typography from '@components/typography'
import { FontAwesome5 } from '@expo/vector-icons'
import useUserReceipts from '@views/home/use-user-receipts'
import React, { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

function TitleSection() {
  const formContext = useFormContext<CreateReceiptFormState>()

  const { data: receipt } = useUserReceipts()

  const noOfReceipts = useMemo(() => receipt.length || 1, [receipt])

  useEffect(() => {
    formContext.setValue('title', `Paragon #${noOfReceipts}`)
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
          <FontAwesome5 name="info" size={getPx(2)} color={colors.text} />
          <Typography variant="base2">
            Pozostawiony domyślny tytuł zostanie wygenerowany na podstawie produktów/zdjęcia paragonu
          </Typography>
        </Flex>
      </Paper>
    </Flex>
  )
}

export default TitleSection

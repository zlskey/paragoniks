import type { UseDrawerFunctionsRef } from '@components/drawer/drawer'
import { colors, getPx } from '@app/styles'
import Button from '@components/button'
import Drawer from '@components/drawer'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import AntDesign from '@expo/vector-icons/AntDesign'
import useUpdateUserMeta from '@helpers/api-hooks/use-update-user-meta'
import { useUserContext } from '@helpers/contexts/user.context'
import useUploadImage from '@helpers/hooks/use-upload-image'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import useUploadReceipt from '../../../views/home/create-receipt-button/use-upload-receipt'

type State = 'main' | 'image_quality_warning'

interface CreateReceiptDrawerProps {
  drawerRef: UseDrawerFunctionsRef
}

/**
 * @todo - buttons should stretch
 * @todo - add building state
 */
function CreateReceiptDrawer({ drawerRef }: CreateReceiptDrawerProps) {
  const [currentState, setCurrentState] = useState<State>('main')

  const { mutate: handleUploadReceipt, isPending } = useUploadReceipt()
  const { handleUpload: uploadImage } = useUploadImage()

  const user = useUserContext()
  const {
    mutateAsync: handleUpdateUserMeta,
    isPending: isUpdateUserMetaPending,
  } = useUpdateUserMeta()

  function onFillManuallyClicked() {
    router.push({ pathname: '/receipt/create' })
    drawerRef.current?.dismiss()
  }

  const onGenerateFromImageClicked = useCallback(async () => {
    if (!user.user.meta?.media_quality_warning_accepted) {
      setCurrentState('image_quality_warning')
      return
    }
    await uploadImage(handleUploadReceipt)
    drawerRef.current?.dismiss()
  }, [
    user,
    uploadImage,
    handleUploadReceipt,
  ])

  const onImageQualityWarningAccept = useCallback(async () => {
    await handleUpdateUserMeta({ media_quality_warning_accepted: true })
    await uploadImage(handleUploadReceipt)
    drawerRef.current?.dismiss()
  }, [
    uploadImage,
    handleUploadReceipt,
    handleUpdateUserMeta,
  ])

  return (
    <Drawer
      ref={drawerRef}
      title="Tworzenie paragonu"
    >
      {currentState === 'main' && !isPending && (
        <Flex
          pb={2}
          spacing={1}
          direction="column"
          alignContent="stretch"
        >
          <Typography variant="base2">
            Prześlij zdjęcie paragonu, a AI wyodrębni kluczowe informacje szybko i łatwo.
            Skorzystaj z opcji manualnej, aby samodzielnie wprowadzić dane.
          </Typography>

          <Flex spacing={1} justifyContent="space-evenly">
            <CreateReceiptDrawerButton
              iconName="scan1"
              label="Wygeneruj ze zdjęcia"
              onClick={onGenerateFromImageClicked}
            />

            <CreateReceiptDrawerButton
              iconName="form"
              label="Wpisz dane ręcznie"
              onClick={onFillManuallyClicked}
            />
          </Flex>
        </Flex>
      )}

      {currentState === 'image_quality_warning' && !isPending && (
        <Flex direction="column" alignContent="stretch" spacing={2}>
          <Paper styles={{ backgroundColor: colors.red }}>
            <Flex p={1} spacing={1} alignContent="center">
              <AntDesign name="warning" size={getPx(3)} color={colors.text} />
              <Typography>
                Dane odczytane z nieostrych zdjęć mogą zawierać błędy.
                Dlatego pamiętaj, aby zadbać o jak najlepszą jakość
                widoczności paragonu na fotografii.
              </Typography>
            </Flex>
          </Paper>

          <Flex justifyContent="flex-end">
            <Button
              small
              isDisabled={isUpdateUserMetaPending}
              onPress={onImageQualityWarningAccept}
              style={{ backgroundColor: '#2c2c2c' }}
            >
              Nie pokazuj więcej
            </Button>
          </Flex>
        </Flex>
      )}

      {isPending && (
        <Flex direction="column" alignContent="center" justifyContent="center" pb={3} spacing={2}>
          <Typography>
            Trwa skanowanie paragonu, możesz zamknąć to okno,
            a my poinformujemy Cię gdy paragon będzie gotowy.
          </Typography>
          <ActivityIndicator size="small" />
        </Flex>
      )}
    </Drawer>
  )
}

interface CreateReceiptDrawerButtonProps {
  label: string
  onClick: () => void
  iconName: React.ComponentProps<typeof AntDesign>['name']
}

function CreateReceiptDrawerButton({
  label,
  onClick,
  iconName,
}: CreateReceiptDrawerButtonProps) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ borderRadius: getPx(1), backgroundColor: '#2c2c2c' }}
    >
      <Flex
        p={1}
        spacing={0.5}
        direction="column"
        alignContent="center"
      >
        <AntDesign name={iconName} size={getPx(3)} color={colors.text} />
        <Typography ellipsizeMode="middle" numberOfLines={2}>{label}</Typography>
      </Flex>
    </TouchableOpacity>
  )
}

export default CreateReceiptDrawer

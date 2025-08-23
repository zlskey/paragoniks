import type { Anonim } from '@types'
import Avatar from '@components/avatar'
import Flex from '@components/flex'
import ProfilesAlphabeticallList from '@components/profiles-alphabeticall-list'
import Typography from '@components/typography'
import { Swipeable } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import RemoveAnonimButton from './remove-anonim'
import useRemoveAnonim from './remove-anonim/use-remove-anonim'

interface AnonimItemProps {
  anonim: Anonim
}

function AnonimItem({ anonim }: AnonimItemProps) {
  const { colors } = useTheme()
  const handleRemoveAnonim = useRemoveAnonim()

  function onSwipeableOpen(direction: 'left' | 'right') {
    if (direction === 'right') {
      handleRemoveAnonim({ username: anonim.username })
    }
  }

  return (
    <Swipeable
      friction={1}
      onSwipeableOpen={onSwipeableOpen}
      renderRightActions={() => <RemoveAnonimButton />}
    >
      <Flex
        styles={{ backgroundColor: colors.surface }}
        alignContent="center"
        spacing={1}
        p={1.25}
      >
        <Avatar profile={anonim} size="sm" />
        <Typography>{anonim.username}</Typography>
      </Flex>
    </Swipeable>
  )
}

interface AnonimListProps {
  anonims: Anonim[]
}

function AnonimList({ anonims }: AnonimListProps) {
  const noAnonims = !anonims.length

  if (noAnonims) {
    return <Typography variant="subtitle">Brak anonimów</Typography>
  }

  return (
    <Flex direction="column" alignContent="stretch" spacing={1} nativeFlex>
      <Typography variant="subtitle">Twoje anonimy</Typography>

      <ProfilesAlphabeticallList
        profiles={anonims}
        ProfileItem={({ profile }) => <AnonimItem anonim={profile} />}
      />
    </Flex>
  )
}

export default AnonimList

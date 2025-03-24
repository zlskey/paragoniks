import type { Anonim } from '@app/generic.types'
import { colors } from '@app/styles'
import Avatar from '@components/avatar'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import { FlatList } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import RemoveAnonimButton from './remove-anonim'
import useRemoveAnonim from './remove-anonim/use-remove-anonim'

interface AnonimItemProps {
  anonim: Anonim
}

function AnonimItem({ anonim }: AnonimItemProps) {
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
        styles={{ backgroundColor: colors.paper }}
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
    <Flex direction="column" alignContent="stretch" spacing={1}>
      <Typography variant="subtitle">Twoje anonimy</Typography>

      <Paper>
        <FlatList
          data={anonims}
          keyExtractor={anonim => anonim._id}
          renderItem={({ item }) => <AnonimItem anonim={item} />}
        />
      </Paper>
    </Flex>
  )
}

export default AnonimList

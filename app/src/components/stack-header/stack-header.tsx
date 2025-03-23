import { colors, getPx } from 'src/app/styles'

import Flex from '@components/flex'
import GoBackIcon from '@components/icons/go-back-icon/go-back-icon'
import { Skeleton } from 'moti/skeleton'
import { StyleSheet } from 'react-native'
import Typography from '@components/typography'

const styles = StyleSheet.create({
  container: {
    padding: getPx(2),
    backgroundColor: colors.background,
  },
})

interface StackHeaderProps {
  title?: string
  endAdornment?: React.ReactNode
}

function StackHeader({ title, endAdornment }: StackHeaderProps) {
  return (
    <Flex
      pt={5}
      alignContent='center'
      styles={styles.container}
      justifyContent='space-between'
    >
      <Flex spacing={1} alignContent='center'>
        <GoBackIcon />
        {title ? (
          <Typography variant='title'>{title}</Typography>
        ) : (
          <Skeleton width={getPx(10)} height={getPx(3.3)} />
        )}
      </Flex>
      {endAdornment}
    </Flex>
  )
}

export default StackHeader

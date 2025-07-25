import Flex from '@components/flex'

import GoBackIcon from '@components/icons/go-back-icon/go-back-icon'
import Typography from '@components/typography'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { StyleSheet } from 'react-native'
import { colors, getPx } from 'src/app/styles'

const styles = StyleSheet.create({
  container: {
    padding: getPx(2),
    backgroundColor: colors.background,
  },
})

interface StackHeaderProps {
  title?: string
  onGoBack?: () => void
  endAdornment?: React.ReactNode
}

function StackHeader({ title, endAdornment, onGoBack }: StackHeaderProps) {
  return (
    <Flex
      alignContent="center"
      styles={styles.container}
      justifyContent="space-between"
    >
      <Flex spacing={1} alignContent="center">
        <GoBackIcon overWriteOnClick={onGoBack} />
        {title !== undefined
          ? (
              <Typography variant="title">{title}</Typography>
            )
          : (
              <Skeleton width={getPx(10)} height={getPx(3.3)} />
            )}
      </Flex>
      {endAdornment}
    </Flex>
  )
}

export default StackHeader

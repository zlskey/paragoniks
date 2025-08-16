import type { Profile } from 'src/app/generic.types'
import Typography from '@components/typography'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'
import { AvatarColor } from 'src/app/generic.types'
import { colors, getPx } from 'src/app/styles'

function getContainerSize(size: 'sm' | 'md' | 'lg' | 'xs') {
  switch (size) {
    case 'xs':
      return getPx(1.8)
    case 'sm':
      return getPx(4)
    case 'md':
      return getPx(5)
    case 'lg':
      return getPx(6)
  }
}

function getTextSize(size: 'sm' | 'md' | 'lg' | 'xs') {
  switch (size) {
    case 'xs':
      return getPx(0.9)
    case 'sm':
      return getPx(1.9)
    case 'md':
      return getPx(3)
    case 'lg':
      return getPx(2.8)
  }
}

function getStyles(size: 'sm' | 'md' | 'lg' | 'xs') {
  return StyleSheet.create({
    container: {
      width: getContainerSize(size),
      height: getContainerSize(size),
      borderRadius: getPx(10),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    text: {
      lineHeight: getContainerSize(size),
      color: colors.text,
      fontSize: getTextSize(size),
      fontFamily: 'Poppins-Medium',
    },
  })
}

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xs'
  profile?: Pick<Profile, 'avatarColor' | 'avatarImage' | 'username'>
}

function Avatar({
  size = 'md',
  profile = {
    avatarColor: AvatarColor.Default,
    avatarImage: '',
    username: '',
  },
}: AvatarProps) {
  const styles = getStyles(size)

  const backgroundColor
    = profile.avatarColor === AvatarColor.Default
      ? '#546e7a'
      : profile.avatarColor

  if (profile.avatarImage) {
    const containerSize = getContainerSize(size)
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: containerSize,
            height: containerSize,
            objectFit: 'cover',
          }}
          source={{ uri: profile.avatarImage }}
          alt="User Avatar"
        />
      </View>
    )
  }

  return (
    <View style={[{ backgroundColor }, styles.container]}>
      <Typography styles={styles.text}>
        {profile.username.charAt(0).toUpperCase()}
      </Typography>
    </View>
  )
}

export default Avatar

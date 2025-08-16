import { Image } from 'expo-image'

interface AppLogoProps {
  size?: number
}

function AppLogo({ size = 80 }: AppLogoProps) {
  return (
    <Image
      source={require('@assets/images/adaptive-icon.png')}
      style={{ width: size, height: size, alignSelf: 'center' }}
    />
  )
}

export default AppLogo

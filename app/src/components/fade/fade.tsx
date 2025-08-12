import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

interface FadeProps {
  children: React.ReactNode
  duration?: number
}

function Fade({ children, duration = 1000 }: FadeProps) {
  const fadeAnim = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [fadeAnim, duration])

  return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
}

export default Fade

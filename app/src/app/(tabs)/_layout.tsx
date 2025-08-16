import ParagoniksIcon from '@components/icons/paragoniks-icon'
import { FontAwesome5 } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useTheme } from 'react-native-paper'

export default () => {
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onBackground,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          boxShadow: `0 0 10px 0 ${colors.shadow}`,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Start',
          tabBarIcon: props => <ParagoniksIcon size={35} color={props.color} />,
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          href: '/friends',
          title: 'Znajomi',
          tabBarIcon: props => (
            <FontAwesome5 name="user-friends" size={24} color={props.color} />
          ),
        }}
      />
    </Tabs>
  )
}

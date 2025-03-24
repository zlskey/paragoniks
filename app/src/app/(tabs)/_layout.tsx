import ParagoniksIcon from '@components/icons/paragoniks-icon'
import { FontAwesome5 } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { colors } from 'src/app/styles'

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
        },
        tabBarStyle: {
          backgroundColor: colors.paper,
          borderTopWidth: 0,
          // add white shadow at the top of tab
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'gray',
          shadowRadius: 1,
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

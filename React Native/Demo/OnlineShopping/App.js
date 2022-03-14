import React, { useState, useEffect } from 'react'
import Screen from './app/components/Screen'
import { Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AuthNavigator from './app/navigation/AuthNavigation'
import NavigationTheme from './app/navigation/NavigationTheme'
import AppNavigator from './app/navigation/AppNavigator'
import routes from './app/navigation/routes'

const Tweets = ({ navigation }) => (
  <Screen>
    <Text>Tweets</Text>
    <Button
      title='View Tweet'
      onPress={() => navigation.navigate(routes.TWEET_DETAILS, { id: 1 })}
    />
  </Screen>
)
const TweetDetails = ({ route }) => (
  <Screen>
    <Text> Tweet Details {route.params.id}</Text>
  </Screen>
)

const Account = () => (
  <Screen>
    <Text>Account</Text>
  </Screen>
)
const Stack = createStackNavigator()
const StackaNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: 'dodgerblue' },
      headerTintColor: 'white',
    }}
  >
    <Stack.Screen name='Tweets' component={Tweets} />
    <Stack.Screen name='TweetDetails' component={TweetDetails} />
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator()
const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: 'tomato',
      activeTintColor: 'white',
      inactiveBackgroundColor: 'lightgrey',
      inactiveTintColor: 'black',
    }}
  >
    <Tab.Screen
      name='Feeds'
      component={StackaNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name='home' size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen name='Account' component={Account} />
  </Tab.Navigator>
)

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  )
}

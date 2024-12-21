import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Main from '../screens/Main'
import UserDetails from '../screens/UserDetails'

const Stack = createNativeStackNavigator()

const UserStack = () => {
  return (
        <Stack.Navigator>
            <Stack.Screen 
                options={{headerShown:false}}
                name='Contacts'
                component={Main}/>
            <Stack.Screen
                options={{headerShown:false}}
                name='Details'
                component={UserDetails}/>
        </Stack.Navigator>
  )
}

export default UserStack

const styles = StyleSheet.create({})
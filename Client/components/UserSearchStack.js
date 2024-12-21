import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchContact from '../screens/SearchContact'
import UserDetails from '../screens/UserDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UserSearchStack = () => {
  const Stack = createNativeStackNavigator()
  return (
        <Stack.Navigator>
            <Stack.Screen 
                options={{headerShown:false}}
                name='Contacts'
                component={SearchContact}/>
            <Stack.Screen
                options={{headerShown:false}}
                name='Details'
                component={UserDetails}/>
        </Stack.Navigator>
  )
}

export default UserSearchStack

const styles = StyleSheet.create({})
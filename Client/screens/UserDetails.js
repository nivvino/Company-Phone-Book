import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Linking } from 'react-native'

const UserDetails = ({route}) => {
    const {user}=route.params

    const openDialScreen = () => {
      Linking.openURL(`tel:${user.phone}`)
    };
    const openEmail=()=>{
      Linking.openURL(`mailto:${user.email}`)
    }
  return (
    <View style={styles.container}>
        <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Name: </Text>
            <Text style={styles.contactDetail}>{user.name}</Text>
            <Text style={styles.contactLabel}>Website: </Text>
            <Text style={styles.contactDetail}>{user.website}</Text>
            <Text style={styles.contactLabel}>Company: </Text>
            <Text style={styles.contactDetail}>{user.company.name}</Text>
            <Text style={styles.contactLabel}>Phone: </Text>
            <Pressable onPress={()=>openDialScreen()} style={styles.buttons}>
              <Text style={styles.contactDetail}>{user.phone}</Text>
            </Pressable>
            <Text style={styles.contactLabel}>Email: </Text>
            <Pressable onPress={()=>openEmail()} style={styles.buttons}>
              <Text style={styles.contactDetail}>{user.email}</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default UserDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D5D5DE'
      },
      contactContainer:{
        backgroundColor:'#B4C9E7',
        paddingVertical:5,
        paddingLeft:10,
        borderColor:'gray',
        borderWidth:2,
        borderRadius:5,
        marginBottom:2,
        padding:15,
        paddingVertical:20,
        zIndex:1
      },
      contactDetail:{
        fontSize:20
      },
      contactLabel:{
        fontWeight:'bold',
        textDecorationLine:'underline'
      },
      buttons:{
        backgroundColor:'#888CBB',
        borderRadius:10,
        borderColor:'gray',
        borderWidth:2,
        padding:10
      }
})
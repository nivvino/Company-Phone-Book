import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native'
import { AppContext } from '../context'
import { useIsFocused, useNavigation } from '@react-navigation/native'

const Main = () => {
  const {user,setUser,getSession}=useContext(AppContext)
  const [contacts,setContacts]=useState([])
  const isFocused = useIsFocused()
  const Navigation=useNavigation()

  const getContacts=async()=>{
    try{
      const res=await axios.post('/api/get-contacts')
      setContacts(res.data)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    if(isFocused){
      getSession()
      getContacts()
    }
  },[isFocused])

  const userPress=(user)=>{
    Navigation.navigate('Details',{user})
  }

  return (
    <View style={{flex:1, backgroundColor:'#D5D5DE'}}>
      <Text style={styles.title}>Our Collaborators' Contacts</Text>
      <View style={styles.container}>
          {contacts?(
              <FlatList
                        data={contacts}
                        style={{flex:1,zIndex:1}}         
                        contentContainerStyle={{flexGrow:1}}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=>{
                          return(
                            <Pressable onPress={()=>userPress(item)}>
                              <View style={styles.contactContainer}>
                                <Text style={styles.contactLabel}>Name: </Text>
                                <Text style={styles.contactDetail}>{item.name}</Text>
                                <Text style={styles.contactLabel}>Phone: </Text>
                                <Text style={styles.contactDetail}>{item.phone}</Text>
                                <Text style={styles.contactLabel}>Company: </Text>
                                <Text style={styles.contactDetail}>{item.company.name}</Text>
                              </View>
                            </Pressable>
                          )
                        }}>

              </FlatList>
          ):null}
      </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  title:{
    marginTop:10,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:30
  },
  container: {
    flex: 1,
    marginTop:20,
    paddingHorizontal:20,
    alignItems:'center',
  },
  contactContainer:{
    backgroundColor:'#B4C9E7',
    paddingVertical:5,
    paddingLeft:10,
    paddingHorizontal:50,
    borderColor:'gray',
    borderWidth:2,
    borderRadius:5,
    marginBottom:2,
  },
  contactDetail:{
    fontSize:20
  },
  contactLabel:{
    fontWeight:'bold',
    textDecorationLine:'underline'
  }
})
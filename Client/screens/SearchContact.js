import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native'
import { TextInput } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { AppContext } from '../context'

const SearchContact = () => {

  const [contacts,setContacts]=useState([])
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [companyName,setCompanyName]=useState('')
  const [error,setError]=useState('')
  const isFocused=useIsFocused()

  const {getSession}=useContext(AppContext)

  const getContacts=async()=>{
    setError('')
    if(phone===''&&name===''&&companyName===''){
      setError('Please Enter at least one detail.')
      return
    }
    try{
      const res=await axios.post('/api/get-contacts',{name,companyName,phone})
      setContacts(res.data)
    }catch(error){
      console.log(error)
      setContacts([])
      setError('No Results')
    }
  }
  useEffect(()=>{
    if(isFocused){
      getSession()
    }
  },[isFocused])

  const Navigation = useNavigation()
  const userPress=(user)=>{
    Navigation.navigate('Details',{user})
  }

  return (
    <View style={{flex:1, backgroundColor:'#D5D5DE'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter at least one of the following details:</Text>
        <View style={styles.form}>
        <TextInput style={styles.input}
                        placeholder="Contact's Name"
                        onChangeText={(text)=>setName(text)}/>
        <TextInput style={styles.input}
                        placeholder="Contact's Phone"
                        onChangeText={(text)=>setPhone(text)}/>
        <TextInput style={styles.input}
                        placeholder="Contact's Company"
                        onChangeText={(text)=>setCompanyName(text)}/>
            {error&&<Text style={styles.errorText}>{error}</Text>}
            <Pressable style={styles.confirmButton}
                        onPress={()=>getContacts()}>
                <Text>Confirm</Text>
            </Pressable>
        </View>
            {!error&&(
                    <FlatList data={contacts}
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
            )}
      </View>
    </View>
  )
}

export default SearchContact

const styles = StyleSheet.create({
  title:{
    marginTop:10,
    marginBottom:10,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:15
  },
  container: {
    flex: 1,
    marginTop:20,
    paddingHorizontal:20,
    alignItems:'center',
    justifyContent:'center'
  },
  input:{
    height:40,
    backgroundColor:'#CCDFF8',
    borderColor:'#ddd',
    borderWidth:1,
    marginBottom:25,
    padding:10,
    borderRadius:5
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
  form:{
    backgroundColor:"#B4C9E7",
    padding:20,
    width:'80%',
    justifyContent:'center',
    borderRadius:10,
  },
  contactLabel:{
    fontWeight:'bold',
    textDecorationLine:'underline'
  },
  confirmButton:{
    height:50,
    width:120,
    paddingHorizontal:15,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#2196F3',
    borderRadius:10
  },
  errorText:{
    color:'red',
    textAlign:'center',
    fontSize:20,
    marginBottom:10
  },
})
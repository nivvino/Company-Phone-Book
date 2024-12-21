import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View,Pressable } from 'react-native';
import axios from 'axios'
import { AppContext } from '../context';

const LogIn = () => {


  const {setUser}=useContext(AppContext)

    const [username,setUsername]=useState('')
    const [companyName,setCompanyName]=useState('')
    const [error,setError]=useState('')
  
    const validate=async()=>{
        if(!username) return "Username is required"
        if(!companyName) return "Company name is required"
        try{
            const res = await axios.post('/api/log-in',{username,companyName})
            const data=res.data
            setUser(data)
        }catch(error){
            return error.response.data
        }
    }
    const confirm=async()=>{
      let message = await validate()
      if(message){
        setError(message)
        return
      }
    }
  
  
  return (
    <View style={styles.container}>
    <View style={styles.form}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput style={styles.input}
                placeholder='Enter your usename'
                onChangeText={text=>setUsername(text)}
                value={username}/>
      <Text style={styles.label}>Company:</Text>
      <TextInput  style={styles.input} 
                  placeholder='Enter your company name'
                  onChangeText={text=>setCompanyName(text)}
                  value={companyName}/>
      {error?<Text style={styles.errorText}>{error}</Text>:null}
      <Pressable style={styles.confirmButton} onPress={()=>confirm()}>
          <Text>Login</Text>
      </Pressable>
    </View>
  </View>
  )
}

export default LogIn

const styles = StyleSheet.create({
    title:{
      textAlign: 'center',
      fontSize: 30, 
      fontWeight: 'bold',
      marginBottom:30
    },
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center',
    },
    form:{
      backgroundColor:"#B4C9E7",
      padding:20,
      paddingHorizontal:50,
      justifyContent:'center',
      borderRadius:10,
    },
    label:{
      marginRight:'auto',
      fontSize:24,
      marginBottom:10,
      fontWeight:'bold'
    },
    input:{
      height:40,
      backgroundColor:'#CCDFF8',
      borderColor:'#ddd',
      borderWidth:1,
      marginBottom:25,
      padding:10,
      borderRadius:5,
      width:200
    },
    errorText:{
      color:'red',
      textAlign:'center',
      fontSize:20,
      marginBottom:10
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
    }
  });
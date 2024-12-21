import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { AppContext } from '../context'

const LogOut = () => {

    const {setUser}=useContext(AppContext)

    const logOut=async()=>{
        const res = await axios.get('/api/log-out')
        setUser({})
    }

    useEffect(()=>{
        logOut()
    },[])
  return (
    <View style={{justifyContent:'center', alignItems:'center',marginTop:'50%'}}>
      <Text style={{fontSize:40}}>Logging Out...</Text>
    </View>
  )
}

export default LogOut

const styles = StyleSheet.create({})
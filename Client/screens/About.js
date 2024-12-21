import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { AppContext } from '../context';

const About = () => {
  const {getSession}=useContext(AppContext)
  const isFocused=useIsFocused()
  useEffect(()=>{
    if(isFocused){
      getSession()
    }
  },[isFocused])
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>About Company Phone Book</Text>
        <Text style={styles.description}>
          Company Phone Book is developed by Some Company to 
          facilitate easier access to contact information
          of collaborating companies.
        </Text>
        <Text style={styles.info}>
          Version: 1.0.0{'\n'}
          Developer: Some Company{'\n'}
          Contact: contact@somecompany.com
        </Text>
      </View>
    </View>
  );
};

export default About

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
    paddingVertical:100,
    backgroundColor:'#D5D5DE'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius:15,
    width:'80%',
    backgroundColor: "#B4C9E7",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginBottom:40
  },
  description: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
  },
});

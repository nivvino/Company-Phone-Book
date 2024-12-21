import { useEffect, useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from './context';
import LogIn from './screens/LogIn';
import About from './screens/About';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogOut from './screens/LogOut';
import UserStack from './components/UserStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserSearchStack from './components/UserSearchStack';

axios.defaults.baseURL='http://192.168.1.42:4000'

export default function App() {
  
  const [user,setUser]=useState({})
  const [loggedIn,setLoggedIn]=useState(false)

  const Drawer=createDrawerNavigator()

   const getSession=async()=>{
     try{
      const res = await axios.get('/api/get-session')
      setLoggedIn(true)
     }catch(error){
      console.log(error)
      setLoggedIn(false)
      if(Object.keys(user).length!==0)
        setUser({})
     }
   }
  useEffect(()=>{
    getSession()
  },[user])

  const dismissKeyboard=()=>{
    if(Platform.OS==='web')
      return
    Keyboard.dismiss()
  }

  return (
    <AppContext.Provider value={{user,setUser,getSession}}>
      <SafeAreaView style={{flex:1,backgroundColor:'#D5D5DE'}}>
        <TouchableWithoutFeedback onPress={()=>dismissKeyboard()}>
          <View style={styles.container}>
            {loggedIn?(      
              <NavigationContainer>
                  <Drawer.Navigator initialRouteName='Main'
                                    screenOptions={{
                                    drawerStyle:{backgroundColor:'#C0C0CA'},
                                    headerStyle:{backgroundColor:'#DFE1F1'},
                                    drawerActiveBackgroundColor:"#DFE1F1",
                                    drawerInactiveBackgroundColor:'#f5f5f5',
                                  }}>
                  <Drawer.Screen name='Main' component={UserStack}/>
                  <Drawer.Screen name='Search Contact' component={UserSearchStack}/>
                  <Drawer.Screen name='About' component={About}/>
                  <Drawer.Screen name='LogOut' component={LogOut}/>
              </Drawer.Navigator>
          </NavigationContainer>):(<LogIn/>)}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
  }
});

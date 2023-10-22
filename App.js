import React,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import GithubLoginScreen from './src/githubLoginScreen';
import TabNavigation from './src/navigation/tabNavigator';
import FontLoader from './src/components/useFont';
import { ProjectProvider } from './src/project-management/projectContext';





const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(()=>{
  async function checkToken(){
  let token
  try{ token = await AsyncStorage.getItem('token') }
  catch (e) { console.log(e) }
  setUserToken( token )
  setIsLoading( false )}
  checkToken()}, [])

  if (isLoading) {
    return <View><Text>Loading..</Text></View>;}

  return (  
    <ProjectProvider>
      <FontLoader>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{headerShown:false}}
            initialRouteName={userToken ? "Tab" : "Login"}>
            <Stack.Screen name="Login" component={GithubLoginScreen} />
            <Stack.Screen name="Tab" component={TabNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </FontLoader>
    </ProjectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

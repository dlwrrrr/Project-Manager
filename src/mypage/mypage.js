import react from "react";
import {View, Text, SafeAreaView, Button} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {m_styles} from './mypageStyle'



export default function Mypage({navigation}){
    const handleLogout = async () => {
        try {
          await AsyncStorage.clear(); // Clear all data in the storage
          navigation.navigate('Login'); // Navigate back to login screen
        } catch (e) {
          console.error(e);
        }}
    return(
        <View style={m_styles.container}>
            <SafeAreaView>
            <Button title='Logout' onPress={handleLogout}></Button>
            </SafeAreaView>
        </View>
    )
}
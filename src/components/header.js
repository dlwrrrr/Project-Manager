import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ title, navigation, children }) => {
  return (
    <View>
      <Header
        leftComponent={ 
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={1}
          hitSlop={{right:100}}>
          <Ionicons 
            name="chevron-back" 
            size={28} 
            color="black" 
            />
          </TouchableOpacity>
        }
        centerComponent={{ text: title, style: { color: 'black' , fontSize: 15, fontFamily:'NS_EB', marginTop:5} }}
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
          alignItems:'center'
        }}
      />
      {/* Render child components */}
      {children}
    </View>
  );
};

export default CustomHeader;

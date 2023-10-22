import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    NS_B: require('../../assets/font/NanumSquareNeo-B.ttf'),
    NS_EB: require('../../assets/font/NanumSquareNeo-E_B.ttf'),
    NS_HV: require('../../assets/font/NanumSquareNeo-Hv.ttf'),
    NS_R: require('../../assets/font/NanumSquareNeo-Rg.ttf'), 
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // or your loading screen.
  }

  return children;
};

export default FontLoader;

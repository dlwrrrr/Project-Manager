import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import {styles} from './components/style'


WebBrowser.maybeCompleteAuthSession();

const discovery = {
authorizationEndpoint: 'https://github.com/login/oauth/authorize',
tokenEndpoint: 'https://github.com/login/oauth/access_token',
revocationEndpoint: 'https://github.com/settings/connections/applications/66c3e4ce35844c43b571'
};

export default function GithubLoginScreen({navigation}) {

const [request, response, promptAsync] = useAuthRequest(
{
clientId: 'da78ae668e583c3e28bc',
scopes: ['user', 'repo'],
redirectUri: makeRedirectUri({
scheme: 'project-manager'
})
},
discovery,
);

useEffect(() => {
if (response?.type === 'success') {
const { code } = response.params;

  // The code below is an example of how you can exchange the code for an access token.
  // You would need to replace the client_id and client_secret with your own values.
  
  fetch('https://github.com/login/oauth/access_token', {
    method: "POST",
    headers: {
      Accept:'application/json',
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:`client_id=da78ae668e583c3e28bc&client_secret=fb4c69573ec49bd54194ebd52c3d82e52e43fd9e&code=${code}`
  })
   .then(response => response.json())
   .then(data => {
    console.log(data)
    if (data.access_token) { // Check if the access token exists
      AsyncStorage.setItem('token', data.access_token)
        .then(() => {
          console.log('Token saved successfully');
          navigation.navigate('Tab');
        })
        .catch(error => console.error(error));
    } else {
      console.error('Failed to get access token');
      promptAsync({useProxy : false}) //조건문 내부에 작성해야함 ( 로그인창_)
    }
  })

}
}, [response]);

return (
<View style={styles.container}>
<TouchableOpacity

style={styles.button}
disabled={!request}
onPress={() => promptAsync()}>
<Text style={{color:'white'}}>Login with Github</Text>
</TouchableOpacity>
</View>
);
}

// .then(data => {
//   //        console.log(data); //fetch 함수가 제대로 access token을 받아오는지 확인
//           AsyncStorage.setItem('token', data.access_token)//setItem이 완료된 후token 값이 완전히 저장되면 홈 화면으로 이동
//             .then(() => { console.log('Token saved successfully');//token이 저장되었는지 확인
//               navigation.navigate('Home');
//             })
//             .catch(error => console.error(error));
//         })
//         promptAsync({useProxy : false})
//       }
//     }, [response]);
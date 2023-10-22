//./src/mypage/mypageStackNavi

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mypage from './mypage';

const MypageStack= createStackNavigator()

export default function MypageStackScreen(){
    return(<MypageStack.Navigator 
                screenOptions={{headerShown:false}}>
                     <MypageStack.Screen name='Mypage' component={Mypage}/>
        </MypageStack.Navigator>
    )
}
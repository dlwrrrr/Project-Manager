    // ./src/navigation/tabnaigator
    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
    import TodoScreen from '../schedule/ToDoList';
    import PrmStackScreen from '../project-management/prmStackNavi';
    import MypageStackScreen from '../mypage/mypageStackNavi';
    import { theme } from '../components/color';

    const Tab = createBottomTabNavigator(); 



    const TabNavigation=()=> {
        return(
            
            <Tab.Navigator 
            
            screenOptions={{
                headerShown: false, //스택 내 화면에서 헤더가 안보이도록
                tabBarShowLabel: false, //tabBar icon의 타이틀 설정 false=>안보이게
                tabBarStyle: { display: 'flex' },
            }}>
                
                    <Tab.Screen name='Prm' component={PrmStackScreen} options={{tabBarIcon : ({focused, color, size})=>(
                            <MaterialCommunityIcons name={focused ? "view-list" : "view-list-outline"} color={theme.orange} size={35}/>
                    )}}/>
                    <Tab.Screen name='Schdule' component={TodoScreen} options={{tabBarIcon : ({focused, color, size})=>(
                            <MaterialCommunityIcons name={focused ? "calendar-month" : "calendar-outline"} color={theme.orange} size={30}/>
                    )}}/>
                    <Tab.Screen name='MypageScreen' component={MypageStackScreen} options={{tabBarIcon : ({focused, color, size})=>(
                            <Ionicons name={focused ? "person" : "person-outline"} color={theme.orange} size={30}/>
                    )}}/>

            </Tab.Navigator>
        )
    }


    export default TabNavigation

    {/* <Ionicons name="ios-home" size={24} color="black" />
    <Ionicons name="ios-home-outline" size={24} color="black" />
    <MaterialCommunityIcons name="view-list" size={24} color="black" />
    <MaterialCommunityIcons name="view-list-outline" size={24} color="black" />
    <MaterialCommunityIcons name="calendar-month" size={24} color="black" />
    <MaterialCommunityIcons name="calendar-month-outline" size={24} color="black" />
    <Ionicons name="person" size={24} color="black" />
    <Ionicons name="person-outline" size={24} color="black" /> */}
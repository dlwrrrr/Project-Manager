//./src/project-management/prmStackNavi

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrmMain from './prmMain';
import AddProject from './addProject';
import ProjectDetailScreen from './projectDetail';


const PrmStack= createStackNavigator()

export default function PrmStackScreen(){
    return(<PrmStack.Navigator 
                screenOptions={{headerShown:false}}>

                     <PrmStack.Screen name='Main' component={PrmMain}/>
                     <PrmStack.Screen name='AddProject' component={AddProject}/>
                     <PrmStack.Screen name='Detail' component={ProjectDetailScreen}/>
        </PrmStack.Navigator>
    )
}
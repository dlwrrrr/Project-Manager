// PrmMain.js

import React, { useContext, useState } from 'react';
import { View, FlatList, Button, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import CustomHeader from '../components/header';
import { ProjectContext } from './projectContext';
import { styles_List } from './prmStyle';
import { Swipeable } from 'react-native-gesture-handler';

const PrmMain = ({ navigation }) => {
  const { projects, deleteProject } = useContext(ProjectContext);

  const renderRightActions = (item) => (
    <TouchableOpacity onPress={() => deleteProject(item.id)}>
      <View style={{backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width:40, height:30, borderRadius:5, margin:10}}>
        <Text style={{color:'white'}}>삭제</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
  <Swipeable renderRightActions={() => renderRightActions(item)}>
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <TouchableOpacity 
      activeOpacity={1}
      style={styles_List.renderBox}>
      <Text
      style={styles_List.renderText}
      onPress={() => navigation.navigate('Detail', { project: item })}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  </Swipeable>
  );

  return (
    <View style={{flex:1}}>
      <CustomHeader title='MyProject' navigation={navigation} />
      <FlatList 
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <Button 
          title="Add Project" 
          onPress={() => navigation.navigate('AddProject')} 
        />}
      />
    </View>
   );
};

export default PrmMain;
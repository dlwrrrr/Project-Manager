import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated
} from "react-native";
import CustomHeader from "../components/header";
import { p_styles } from "./prmStyle";
import * as WebBrowser from "expo-web-browser";
import DateTimePicker from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from 'expo-checkbox';
import { Swipeable } from "react-native-gesture-handler";

const ProjectDetailScreen = ({ navigation, route }) => {
  const [project, setProject] = useState(route.params.project);
  const [newTaskName, setNewTaskName] = useState("");
  const [newDeadlineDate, setNewDeadlineDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setNewDeadlineDate(date); 
    hideDatePicker();
  };

  const handleAddTask = () => {
    if (Array.isArray(project.tasks)) {
      const newTasks = [...project.tasks];
      newTasks.push({
        name: newTaskName,
        date: newDeadlineDate.toISOString(),
        isDone: false,
      });
      setNewTaskName("");
      saveToStorage(project.id, newTasks);
      setProject({ ...project, tasks: newTasks });
    } else {
      console.error("task 찾을 수 없음");
    }
  };

  useEffect(() => {
    loadFromStorage(project.id);
  }, []);

  async function saveToStorage(id, tasks) {
    
    try {
      await AsyncStorage.setItem(`tasks_${id}`, JSON.stringify(tasks)); 
    } catch (error) {
      console.log(error);
    }
  }

  async function loadFromStorage(id) {
    try {
      let tasks = await AsyncStorage.getItem(`tasks_${id}`);
      if (tasks !== null) {
        tasks = JSON.parse(tasks);
        setProject({ ...project, tasks }); 
      } else {
        tasks = [];
        setProject({ ...project, tasks }); 
      }
    } catch (error) {
       console.log(error);
       const emptyTasks = [];
       setProject({ ...project, tasks: emptyTasks }); 
     }
  }

  const handleDeleteTask = (taskToDelete) => {
    const newTasks = project.tasks.filter(task =>
      task.name !== taskToDelete.name || task.date !== taskToDelete.date);
    saveToStorage(project.id, newTasks);
    setProject({ ...project, tasks: newTasks });
  };

  const renderRightActions = (task) => (
    <TouchableOpacity onPress={() => handleDeleteTask(task)}>
      <View style={{backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width:40, height:30, borderRadius:5}}>
        <Text style={{color:'white'}}>삭제</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <CustomHeader title={project.name} navigation={navigation} />
      </View>

      <View>
        <TouchableOpacity
          style={p_styles.repoBox}
          onPress={() => WebBrowser.openBrowserAsync(project.url)}
        >
          <Text
            style={{ fontFamily: "NS_B", color: "white", textAlign: "center" }}
          >
            Open Repository
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 100, marginLeft: 20, marginRight: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              flex: 0.5,
              height: 35,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              textAlign: "center",
            }}
            value={newTaskName}
            onChangeText={setNewTaskName}
            returnKeyType="done"
            placeholder="일정을 추가하세요."
          />

          <TouchableOpacity
            onPress={showDatePicker}
            style={{ backgroundColor: "#ccc", height: 25, width: 70 }} >
            <Text style={ { fontFamily: "NS_R", fontSize: 20, textAlign: "center" }} >마감일</Text>
          </TouchableOpacity>

          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <TouchableOpacity
            onPress={handleAddTask}
            style={{ backgroundColor: "#ccc", height: 25, width: 45 }}
          >
            <Text style={ { fontFamily: "NS_R", fontSize: 20, textAlign: "center" }} >추가</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={{marginTop:30}}>
          <View>
            {project.tasks &&
              project.tasks
                .sort((a, b) => a.isDone - b.isDone)
                .map((task, index) => (
                  <Swipeable key={index} renderRightActions={() => renderRightActions(task)}>
                  <View key={index} style={{marginVertical:10, borderBottomWidth:0.5, borderColor:'#ccc'}}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height:30,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={[p_styles.taskText, { flex: 0.4, textAlign:"center" }]}>
                        {task.name}
                      </Text>
                      <Text style={p_styles.taskText}>
                        {new Date(task.date).toLocaleDateString()}
                      </Text>
                      <Checkbox
                        value={task.isDone}
                        onValueChange={(newValue) => {
                          const updatedTasks=project.tasks.map((t)=>
                            t.name===task.name && t.date===task.date ? {...t,isDone:newValue}:t);
                          saveToStorage(project.id , updatedTasks);
                          
                          setProject({...project,tasks:updatedTasks});
                        }}
                      />
                    </View>
                  </View>
              </Swipeable>
                ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProjectDetailScreen;

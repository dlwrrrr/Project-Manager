import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-community/picker';
import { ProjectContext } from './projectContext';
import CustomHeader from '../components/header';
import { p_styles } from './prmStyle';

const AddProject =({ navigation }) => {
  const [projectName, setProjectName] = useState('');
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const { addProject } = useContext(ProjectContext);
  const [isPickerVisible, setPickerVisibility] = useState(false);




  useEffect(() => {
    (async () => {
      try {
        // Retrieve token from storage
        const token = await AsyncStorage.getItem('token');
        
        if (token !== null) {
          // Fetch repositories using GitHub API
          const response = await axios.get('https://api.github.com/user/repos', {
            headers: { Authorization: `token ${token}` },
          });

          if (response.status === 200) {
            setRepos(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  
   const handleSubmit = () => {
    if (projectName.length > 0 && selectedRepo !== null) {
        const repoData = repos.find((repo) => repo.name === selectedRepo);
        addProject({
          id: Date.now(), 
          name: projectName , 
          repo: selectedRepo, 
          url: repoData.html_url,
          schedules:[],
        });
    
        setProjectName('');
        setSelectedRepo(null);

        navigation.navigate('Main');
        
      } else alert('Please enter a project name and select a repository!');
    };
  

  return (
    <View>
    <View>
        <CustomHeader title='Add Project' navigation={navigation} /></View>
        <View style={{marginTop:200}}>
        <Text style={p_styles.title}>ProjectName</Text>
        <View style={p_styles.inputContainer}>
      <TextInput 
        placeholder="프로젝트명을 입력하세요."
        value={projectName}
        onChangeText={setProjectName}
        style={p_styles.Textin}
        returnKeyType='done'
      />
      </View>

      <View style={{marginTop:30}}>

      <Text style={p_styles.title}>Repository</Text>
      
      <TouchableOpacity onPress={() => setPickerVisibility(true)}>
          <View style={p_styles.repoPicker}>
            {selectedRepo ? (
                <Text style={p_styles.selectedRepoText}>{selectedRepo}</Text>
            ) : (
                <Text style={p_styles.placeholderText}>선택</Text>
            )}
          </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal 
        visible={isPickerVisible} 
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisibility(false)}
      >
          {/* Overlay */}
          <TouchableWithoutFeedback onPress={() => setPickerVisibility(false)}>
              <View style={p_styles.modalOverlay}/>
          </TouchableWithoutFeedback>

          {/* Content */}
          <View style={p_styles.modalContent}>
              {/* Picker */}
              <Picker 
                  selectedValue={selectedRepo}
                  onValueChange={(itemValue) => {
                      setSelectedRepo(itemValue)
                      setPickerVisibility(false)
                  }}
              >
                  {repos.map((repo) =>
                    (<Picker.Item key={`${repo.id}`} label={`${repo.name}`} value={`${repo.name}`} />)
                  )}
              </Picker>
          </View>  
          
      </Modal>
      </View>

     <View style={{justifyContent:'center', alignItems:'center', marginTop:60}}>
     <TouchableOpacity onPress={handleSubmit} style={p_styles.registerBox}>
         <Text style={p_styles.registText}>등록</Text>
     </TouchableOpacity>
     </View>
     </View>
    </View>
  );
};

export default AddProject;
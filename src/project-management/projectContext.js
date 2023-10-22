// ProjectContext.js

import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = [];
function projectReducer(state, action) {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.project];
    case 'LOAD_PROJECTS': 
      return action.projects;
     case 'DELETE_PROJECT': 
      return state.filter(project => project.id !== action.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}


const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  
  useEffect(() => {
    (async () => {
      const storedProjects = await AsyncStorage.getItem('projects');
      if (storedProjects) {
        dispatch({ type: 'LOAD_PROJECTS', projects: JSON.parse(storedProjects)});
      }
    })();
  }, []);

  
  useEffect(() => {
    AsyncStorage.setItem('projects', JSON.stringify(state));
  }, [state]);

  
const addProject = (project) => {
    dispatch({ type: 'ADD_PROJECT', project });
};

const deleteProject = (id) => {   
  dispatch({ type: 'DELETE_PROJECT', id });
};

return (
<ProjectContext.Provider value={{ projects: state, addProject, deleteProject }}>
{children}
</ProjectContext.Provider>
);
}

export { ProjectContext, ProjectProvider };

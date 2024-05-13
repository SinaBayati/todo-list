import './styles.css';
import createInitialDATA from './createInitialDATA.js';
import { createTodo, addTodo, removeTodo, updateTodo } from './todos.js';
import { createProject, addProject, removeProject, updateProject } from './projects.js';

const DATA = createInitialDATA();
localStorage.setItem("DATA",JSON.stringify(DATA));


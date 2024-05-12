import './styles.css';
import createInitialDATA from './createInitialDATA.js';
import { createTodo, addTodo, removeTodo } from './todos.js';
import { createProject, addProject, removeProject } from './projects.js';

const DATA = createInitialDATA();
localStorage.setItem("DATA",JSON.stringify(DATA));


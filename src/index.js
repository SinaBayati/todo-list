import './styles.css';
import {
  createInitialDATA,
  createProject,
  addProject,
  removeProject,
  updateProject,
  createTodo,
  addTodo,
  removeTodo,
  updateTodo
} from './barrel.js';

let DATA = createInitialDATA();
localStorage.setItem("DATA",JSON.stringify(DATA));

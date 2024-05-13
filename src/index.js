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
  updateTodo,
  getTodayTodos
} from './barrel.js';

function setDATA(DATA){
  localStorage.setItem("DATA",JSON.stringify(DATA));
}

function getDATA(){
  return JSON.parse(localStorage.getItem("DATA"));
}

let DATA = createInitialDATA();

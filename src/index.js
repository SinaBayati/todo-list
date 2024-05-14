import './styles.css';

import {
  createInitialDATA
} from "./createInitialDATA.js";

import {
  createProject,
  addProject,
  removeProject,
  updateProject
} from "./projects.js";

import {
  createTodo,
  addTodo,
  removeTodo,
  updateTodo,
  getAllTodos,
  getTargetDateTodos,
  changeTodoStatus,
  getTodo
} from "./todos.js";

import {
  removeActiveClasses,
  createProjectElement,
  createTodoElement,
  setActiveTab,
  createTodoModal,
  createProjectModal
} from "./DOM.js";

function setDATA(DATA){
  localStorage.setItem("DATA",JSON.stringify(DATA));
}

function getDATA(){
  return JSON.parse(localStorage.getItem("DATA"));
}

function setInitialData(){
  if(!getDATA()){
    setDATA(createInitialDATA());
  }
}

setInitialData();

const projectsBtn = document.querySelector("#projects-btn");
const addProjectBtn = document.querySelector("#projects-add-btn");
const todayTodosBtn = document.querySelector("#today-todos");
const display = document.querySelector("#display");
const overlay = document.querySelector("#overlay");

projectsBtn.addEventListener("click",allProjectsHandler);
addProjectBtn.addEventListener("click",addProjectHandler);
todayTodosBtn.addEventListener("click",todoyTodosHandler);

// menu handlers

function allProjectsHandler(e){
  display.innerHTML = "";
  setActiveTab(e);
  renderProjects(getDATA().projects,display);
}

function addProjectHandler(e){
  display.innerHTML = "";
  setActiveTab(e);
}

function todoyTodosHandler(e){
  display.innerHTML = "";
  setActiveTab(e);
}

// todo item handlers

function changeTodoStatusHandler(event){
  const projectTitle = 
    event.currentTarget.dataset.projectTitle;

  const todoTitle = 
    event.currentTarget.dataset.todoTitle;

  let DATA = getDATA();
  setDATA(changeTodoStatus(DATA,projectTitle,todoTitle));
  renderProjects(getDATA().projects,display);
}

let currentProjectTitle = "Default project title";

function addTodoToProject(e){
  currentProjectTitle = e.currentTarget.dataset.projectTitle;
  renderModal(createTodoModal(todoSubmitHandler),overlay);
  setSubmitListener(todoSubmitHandler);  
}

function setSubmitListener(todoSubmitHandler){
  const todoSubmitBtn = document.querySelector("#todo-submit");
  todoSubmitBtn.addEventListener("click",todoSubmitHandler);
}

function todoSubmitHandler(e){
  const newTodoTitle = e.target.parentElement
    .querySelector("#todo-title").value;
  
  const newTodoDescription = e.target.parentElement
  .querySelector("#todo-description").value;

  const newTodoPriority = e.target.parentElement
  .querySelector("#todo-priority").value;

  const newTodoDueDate = e.target.parentElement
  .querySelector("#todo-due-date").value;

  let newDATA = addTodo(getDATA(),currentProjectTitle,createTodo(newTodoTitle,newTodoDescription,false,newTodoDueDate,newTodoPriority));
  setDATA(newDATA);
  overlay.classList.remove("active");
  renderProjects(newDATA.projects,display);
}

// render functions

function renderProjects(projects,target){
  target.innerHTML = "";
  projects.forEach(project => {
    target.appendChild(
      createProjectElement(
        project,
        addTodoToProject,
        ()=>console.log("Edit a project"),
        ()=>console.log("Remove a project"),
        changeTodoStatusHandler,
        ()=>console.log("Edit todo"),
        ()=>console.log("Remove a todo")
      )
    );
  });
}

function renderModal(modal,overlay){
  overlay.appendChild(modal);
  overlay.classList.add("active");
}
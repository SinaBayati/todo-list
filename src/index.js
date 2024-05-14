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
const display = document.querySelector("#display");
const overlay = document.querySelector("#overlay");

projectsBtn.addEventListener("click",allProjectsHandler);
addProjectBtn.addEventListener("click",addProjectHandler);

let currentProjectTitle = "Default project title";

// menu handlers

function allProjectsHandler(e){
  display.innerHTML = "";
  setActiveTab(e);
  renderProjects(getDATA().projects,display);
}

function addProjectHandler(e){
  display.innerHTML = "";
  setActiveTab(e);
  display.appendChild(createProjectModal());
  document.querySelector("#project-modal")
    .querySelector("form")
    .addEventListener("submit",function(e){
      e.preventDefault();
      const newProjectTitle = e.currentTarget.parentElement.querySelector("#project-title").value;
      const newProjectDescription = e.currentTarget.parentElement.querySelector("#project-description").value;
      display.innerHTML = "";
      display.appendChild(createProjectModal());
      const newDATA = addProject(
        getDATA(),
        createProject(newProjectTitle,newProjectDescription)
      );
      setDATA(newDATA);
  });
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

function addTodoToProjectHandler(e){
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

  const newTodoPriority = Number(e.target.parentElement
  .querySelector("#todo-priority").value);

  const newTodoDueDate = e.target.parentElement
  .querySelector("#todo-due-date").value;

  let newDATA = addTodo(getDATA(),currentProjectTitle,createTodo(newTodoTitle,newTodoDescription,false,newTodoDueDate,newTodoPriority));
  setDATA(newDATA);
  overlay.classList.remove("active");
  renderProjects(newDATA.projects,display);
}

function removeProjectHandler(e){
  currentProjectTitle = e.currentTarget.dataset.projectTitle;
  const newDATA = removeProject(getDATA(),currentProjectTitle);
  setDATA(newDATA);
  renderProjects(getDATA().projects,display);
}

// render functions

function renderProjects(projects,target){
  target.innerHTML = "";
  projects.forEach(project => {
    target.appendChild(
      createProjectElement(
        project,
        addTodoToProjectHandler,
        removeProjectHandler,
        changeTodoStatusHandler,
        ()=>console.log("Edit todo"),
        ()=>console.log("Remove a todo")
      )
    );
  });
}

function renderModal(modal,overlay){
  overlay.innerHTML = "";
  overlay.appendChild(modal);
  overlay.classList.add("active");
}

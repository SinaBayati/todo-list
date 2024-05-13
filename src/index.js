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

const projectsBtn = document.querySelector("#projects-btn");
const addProjectBtn = document.querySelector("#projects-add-btn");
const todayBtn = document.querySelector("#today-btn");
const weekBtn = document.querySelector("#week-btn");
const monthBtn = document.querySelector("#month-btn");
const display = document.querySelector("#display");

projectsBtn.addEventListener("click",renderAllProjects);
addProjectBtn.addEventListener("click",renderAddProject);
todayBtn.addEventListener("click",renderTodayTodos);
weekBtn.addEventListener("click",renderWeekTodos);
monthBtn.addEventListener("click",renderMonthTodos);

function removeActiveClasses(event){
  const elements = 
    event.target.parentElement.querySelectorAll("button");
  elements.forEach(element => {
    element.className = "";
  });
}

function addActiveClass(event){
  event.target.className = "active";
}

function createProjectElement(projectObject){
  const buttonsContainer = document.createElement("div");
  
  const addBtn = document.createElement("button");
  addBtn.innerHTML = '<i class="bi bi-plus-lg"></i>';
  addBtn.onclick = addTodoToProjectHandler;
  addBtn.className = "project-btn btn";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
  editBtn.onclick = editProjectHandler;
  editBtn.className = "project-btn btn";

  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = '<i class="bi bi-trash"></i>';
  removeBtn.onclick = removeProjectHandler;
  removeBtn.className = "project-btn btn";

  buttonsContainer.append(addBtn,editBtn,removeBtn);
  buttonsContainer.style.cssText = 
    "display: flex; justify-content: flex-end;";

  const projectContainer = document.createElement("div");
  projectContainer.className = "project";

  const projectTitleEl = document.createElement("h2");
  projectTitleEl.textContent = projectObject.title;

  const projectDescriptionEl = document.createElement("p");
  projectDescriptionEl.textContent = projectObject.description;

  const projectTodosEl = document.createElement("div");
  projectObject.todos.forEach(todo => {
    const todoEl = createTodoElement(todo);
    projectTodosEl.appendChild(todoEl)
  });

  projectContainer.append(
    buttonsContainer,
    projectTitleEl,
    projectDescriptionEl,
    projectTodosEl
  );

  return projectContainer;
}

function createTodoElement(todoObject){
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo";

  const todoTitleEl = document.createElement("h3");
  todoTitleEl.textContent = todoObject.title;
  
  const todoDescriptionEl = document.createElement("p");
  todoDescriptionEl.textContent = todoObject.description;

  const todoStatusEl = document.createElement("p");
  todoStatusEl.textContent = "Status: ";
  todoStatusEl.textContent += 
    (todoObject.isFinished ? "Finished" : "In progress");

  const todoDueDateEl = document.createElement("p");
  todoDueDateEl.textContent = "Due: " + todoObject.dueDate;

  let todoPriorityLevel = "Priority: ";
  if(todoObject.priority == 1){
    todoPriorityLevel += "High";
  }
  else if(todoObject.priority == 2){
    todoPriorityLevel += "Medium";
  }
  else if(todoObject.priority == 3){
    todoPriorityLevel += "Low";
  }
  const todoPriorityEl = document.createElement("p");
  todoPriorityEl.textContent = todoPriorityLevel;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.style.cssText = 
    "display: flex; justify-content: flex-end;"

  const editBtn = document.createElement("button");
  editBtn.className = "btn";
  editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
  editBtn.onclick = editTodoHandler;

  const removeBtn = document.createElement("button");
  removeBtn.className = "btn";
  removeBtn.innerHTML = '<i class="bi bi-trash"></i>';
  removeBtn.onclick = removeTodoHandler;

  const changeStatusBtn = document.createElement("button");
  changeStatusBtn.className = "btn";
  changeStatusBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
  changeStatusBtn.onclick = changeStatusHandler;

  buttonsContainer.append(changeStatusBtn,editBtn,removeBtn);

  todoContainer.append(
    todoTitleEl,
    todoDescriptionEl,
    todoStatusEl,
    todoDueDateEl,
    todoPriorityEl,
    buttonsContainer
  );

  return todoContainer;
}

function renderAllProjects(e){
  removeActiveClasses(e);
  addActiveClass(e);
  display.innerHTML = "";

  const DATA = getDATA();
  DATA.projects.forEach(project => {
    const projectEl = createProjectElement(project);
    display.appendChild(projectEl);
  });
}

function renderTodayTodos(e){
  removeActiveClasses(e);
  addActiveClass(e);
  display.innerHTML = "";
}

function renderWeekTodos(e){
  removeActiveClasses(e);
  addActiveClass(e);
  display.innerHTML = "";
}

function renderMonthTodos(e){
  removeActiveClasses(e);
  addActiveClass(e);
  display.innerHTML = "";
}

function renderAddProject(e){
  removeActiveClasses(e);
  addActiveClass(e);
  display.innerHTML = "";
}

function removeTodoHandler(){
  console.log("removed todo");
}

function editTodoHandler(){
  console.log("edited todo");
}

function changeStatusHandler(){
  console.log("status changed");
}

function editProjectHandler(){
  console.log("edited project");
}

function removeProjectHandler(){
  console.log("removed project");
}

function addTodoToProjectHandler(){
  console.log("added a todo to project");
}
function getPriorityLevelText(priority){
  let priorityLvlText = "Priority: ";
  if(priority === 1){
    priorityLvlText += "High";
  }
  else if(priority === 2){
    priorityLvlText += "Medium";
  }
  else if(priority === 3){
    priorityLvlText += "Low";
  }
  return priorityLvlText;
}

function getStatusText(isFinished){
  let statusText = "Status: ";
  if(isFinished){
    statusText += "Finished";
  }
  else{
    statusText += "In progress";
  }
  return statusText;
}

function createTodoInfo(todoObject,statusText,priorityLevelText){
  const todoInfoContainer = document.createElement("div");

  const todoDescriptionEl = document.createElement("p");
  todoDescriptionEl.textContent = todoObject.description;

  const todoStatusEl = document.createElement("p");
  todoStatusEl.textContent = statusText;

  const todoDueDateEl = document.createElement("p");
  todoDueDateEl.textContent = "Due: " + todoObject.dueDate;
  
  const todoPriorityEl = document.createElement("p");
  todoPriorityEl.textContent = priorityLevelText;

  todoInfoContainer.append(
    todoDescriptionEl,
    todoPriorityEl,
    todoDueDateEl,
    todoStatusEl
  );

  return todoInfoContainer;
}

function createTodoBtn(todoTitle,projectTitle,iTag){
  const todoBtn = document.createElement("button");

  todoBtn.dataset.todoTitle = todoTitle;
  todoBtn.dataset.projectTitle = projectTitle;
  todoBtn.innerHTML = iTag;
  todoBtn.classList.add("btn");

  return todoBtn;
}

function createProjectBtn(projectTitle,iTag){
  const projectBtn = document.createElement("button");

  projectBtn.dataset.projectTitle = projectTitle;
  projectBtn.innerHTML = iTag;
  projectBtn.classList.add("btn","btn-project");

  return projectBtn;
}

function removeActiveClasses(container,selector){
  const elements = container.querySelectorAll(selector);
  elements.forEach(element => {
    element.classList.remove("active");
  });
}

function createTodoElement(todoObject,projectObject,statusHandler,editHandler,removeHandler){
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo";

  const todoTitleEl = document.createElement("h3");
  todoTitleEl.textContent = todoObject.title;
  
  const todoInfoEl = createTodoInfo(todoObject,getStatusText(todoObject.isFinished),getPriorityLevelText(todoObject.priority));

  const buttonsContainer = document.createElement("div");
  buttonsContainer.style.cssText = 
    "display: flex; justify-content: flex-end;"

  const editBtn = createTodoBtn(todoObject.title,projectObject.title,'<i class="bi bi-pencil"></i>');
  editBtn.onclick = editHandler;

  const removeBtn = createTodoBtn(todoObject.title,projectObject.title,'<i class="bi bi-trash"></i>');
  removeBtn.onclick = removeHandler;

  const changeStatusBtn = createTodoBtn(todoObject.title,projectObject.title,'<i class="bi bi-check-lg"></i>');
  changeStatusBtn.onclick = statusHandler;

  buttonsContainer.append(changeStatusBtn,editBtn,removeBtn);

  todoContainer.append(
    todoTitleEl,
    todoInfoEl,
    buttonsContainer
  );

  return todoContainer;
}

function createProjectElement(projectObject,projectAddTodoHandler,projectRemoveHandler,todoStatusHandler,todoEditHandler,todoRemoveHandler){
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project");

  const buttonsContainer = document.createElement("div");
  
  const addBtn = createProjectBtn(projectObject.title,'<i class="bi bi-plus-lg"></i>')
  addBtn.onclick = projectAddTodoHandler;

  const removeBtn = createProjectBtn(projectObject.title,'<i class="bi bi-trash"></i>');
  removeBtn.onclick = projectRemoveHandler;

  buttonsContainer.append(addBtn,removeBtn);
  buttonsContainer.style.cssText = 
    "display: flex; justify-content: flex-end;";

  const projectTitleEl = document.createElement("h2");
  projectTitleEl.textContent = projectObject.title;

  const projectDescriptionEl = document.createElement("p");
  projectDescriptionEl.textContent = projectObject.description;

  const projectTodosEl = document.createElement("div");
  projectObject.todos.forEach(todo => {
    const todoEl = createTodoElement(todo,projectObject,todoStatusHandler,todoEditHandler,todoRemoveHandler);
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

function setActiveTab(event){
  removeActiveClasses(event.target.parentElement,"button");
  event.target.classList.add("active");
}

function createTodoModal(){
  const todoModal = document.createElement("div");
  todoModal.id = "todo-modal";

  todoModal.insertAdjacentHTML("afterbegin",
  `
  <form action="#">
    <legend>Todo Item</legend>
    <fieldset>
      <label for="todo-title">Todo Title:</label>
      <input id="todo-title" type="text">
      <label for="todo-description">Todo Description:</label>
      <textarea id="todo-description" cols="30" rows="5"></textarea>
      <label for="todo-priority">Todo Priority:</label>
      <select id="todo-priority">
        <option value="3" selected>Select priority</option>
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <label for="todo-due-date">Todo due date:</label>
      <input type="date" value="2024-05-12" id="todo-due-date">
      <button id="todo-submit" type="submit">Submit</button>
    </fieldset>
  </form>
  `);

  return todoModal;
}

function createProjectModal(){
  const projectModal = document.createElement("div");
  projectModal.id = "project-modal";

  projectModal.insertAdjacentHTML("afterbegin",
  `
  <form action="#">
    <legend>Project</legend>
    <fieldset>
      <label for="project-title">Project Title:</label>
      <input type="text" id="project-title">
      <label for="project-description">Project Description:</label>
      <textarea id="project-description" rows="5"></textarea>
      <button id="project-submit" type="submit">Submit</button>
    </fieldset>
  </form>
  `);

  return projectModal;
}

export {
  removeActiveClasses,
  createProjectElement,
  createTodoElement,
  setActiveTab,
  createTodoModal,
  createProjectModal
}
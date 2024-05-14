function createTodo(
  title = "Default todo title",
  description = "Default todo description",
  isFinished = false,
  dueDate = new Date(),
  priority = 3
){
  return {
    title,
    description,
    isFinished,
    dueDate,
    priority,
  };
}

function addTodo(DATA,projectTitle,newTodoObject){
  DATA.projects.forEach(project => {
    if(project.title == projectTitle){
      project.todos.push(newTodoObject);
    }
  });

  return DATA;
}

function removeTodo(DATA,projectTitle,todoTitle){
  DATA.projects.forEach(project => {
    if(project.title == projectTitle){
      const index = project.todos
        .findIndex(i => i.title == todoTitle);
      project.todos.splice(index,1);
    }
  });
  
  return DATA;
}

function updateTodo(
  newTodoTitle,
  newTodoDescription,
  newTodoIsFinished,
  newTodoDuDate,
  newTodoPriority,
  DATA,
  projectTitle,
  oldTodoTitle
){
  const newTodo = createTodo(
    newTodoTitle,
    newTodoDescription,
    newTodoIsFinished,
    newTodoDuDate,
    newTodoPriority
  );

  const newDATA = removeTodo(
    DATA,
    projectTitle,
    oldTodoTitle
  );

  return addTodo(newDATA,projectTitle,newTodo); 
}

function getAllTodos(DATA){
  const todos = [];

  DATA.projects.forEach(project => {
    project.todos.forEach(todo => {
      todos.push(todo);
    }); 
  });

  return todos;
}

function getTargetDateTodos(DATA,targetDate){
  const allTodos = getAllTodos(DATA);

  return allTodos
    .filter(todo => todo.dueDate == targetDate);
}

function changeTodoStatus(DATA,projectTitle,todoTitle){
  DATA.projects.forEach(project => {
    if(project.title == projectTitle){
      project.todos.forEach(todo => {
        if(todo.title == todoTitle){
          todo.isFinished = !todo.isFinished;
        }
      });
    }
  });
  return DATA;
}

function getTodo(DATA,projectTitle,todoTitle){
  let targetTodo = null;

  DATA.projects.forEach(project => {
    if(project.title == projectTitle){
      project.todos.forEach(todo => {
        if(todo.title == todoTitle){
          targetTodo = todo;
        }
      });
    }
  });

  return targetTodo;
}

export {
  createTodo,
  addTodo,
  removeTodo,
  updateTodo,
  getAllTodos,
  getTargetDateTodos,
  changeTodoStatus,
  getTodo
}
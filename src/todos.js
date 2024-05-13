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

function getTodayTodos(DATA,date){
  const todayTodos = [];
  DATA.projects.forEach(project => {
    project.todos.forEach(todo => {
      if(todo.dueDate == date){
        todayTodos.push(todo);
      }
    });
  });

  return todayTodos;
}

export {
  createTodo,
  addTodo,
  removeTodo,
  updateTodo,
  getTodayTodos
}
function createTodo(
  title = "Default todo title",
  description = "Default todo description",
  isFinished = false,
  dueDate = new Date(),
  priority = 3
){
  const endOfTheRequiredString = 10;
  const formattedDueDate = 
    dueDate.toISOString().slice(0,endOfTheRequiredString);
  return {
    title,
    description,
    isFinished,
    formattedDueDate,
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
  const endOfTheRequiredString = 10;
  const formattedDueDate = 
    date.toISOString().slice(0,endOfTheRequiredString);

  const todayTodos = [];
  DATA.projects.forEach(project => {
    project.todos.forEach(todo => {
      if(todo.dueDate == formattedDueDate){
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
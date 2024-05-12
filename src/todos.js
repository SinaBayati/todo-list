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

export {
  createTodo,
  addTodo,
  removeTodo
}
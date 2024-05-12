export function addTodo(DATA,projectTitle,newTodoObject){
  DATA.projects.forEach(project => {
    if(project.title == projectTitle){
      project.todos.push(newTodoObject);
    }
  });

  return DATA;
}

export function removeTodo(DATA,projectTitle,todoTitle){
  DATA.projects.forEach(project => {
    if(project.title == projectTitle){
      const index = project.todos
        .findIndex(i => i.title == todoTitle);
      project.todos.splice(index,1);
    }
  });
  
  return DATA;
}

function createProject(
  title = "Default project title",
  description = "Default project description",
  todos = []
){
  return {
    title,
    description,
    todos,
  };
}

function addProject(DATA,newProject){
  DATA.projects.push(newProject);

  return DATA;
}

function removeProject(DATA,projectTitle){
  const index = DATA.projects
    .findIndex(i => i.title == projectTitle);
  DATA.projects.splice(index,1);

  return DATA;
}

function updateProject(newProjectTitle,newProjectDescription,newTodos,DATA,oldProjectTitle){
  const newProject = createProject(
    newProjectTitle,
    newProjectDescription,
    newTodos
  );
  const newDATA = removeProject(DATA,oldProjectTitle);
  return addProject(newDATA,newProject);
}

export { 
  createProject,
  addProject,
  removeProject,
  updateProject,
}
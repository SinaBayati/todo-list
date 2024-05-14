export function createInitialDATA(){
  const DATA = {
    projects: [
      {
        title: "My todo list",
        description: "The default todo list provided by the application",
        todos: [
          {
            title: "Default todo provided by the application",
            description: "Delete this todo item",
            isFinished: true,
            dueDate: "2024-05-12",
            priority: 1,
          },
        ],
      },
    ],
  };
  return DATA;
}
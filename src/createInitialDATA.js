export function createInitialDATA(){
  const DATA = {
    projects: [
      {
        title: "My todo list",
        description: "The default todo list",
        todos: [
          {
            title: "something important",
            description: "do something important",
            isFinished: false,
            dueDate: "2024-05-12",
            priority: 1,
          },
        ],
      },
    ],
  };
  return DATA;
}
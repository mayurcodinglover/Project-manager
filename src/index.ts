import {describeTask, TaskStore} from "./store.js";
import type { Task,Priority,Status } from "./types.js";
import type {User} from "./types.js"
import {TaskRepository} from "./repository.js";

const taskRepo=new TaskRepository();
const priorityWeight:Record<Priority,number>={
  "low":1,
  "medium":2,
  "high":3
};


// console.log(priorityWeight);
// console.log(priorityWeight.high);
// console.log(priorityWeight["low"]);



taskRepo.add({
     title: "Test generics",
  priority: "high",
})

console.log(taskRepo.getAll());
console.log(taskRepo.getById("1"));





// const store=new TaskStore();

// const task1:Task={
//     id:"1",
//     title:"Setup project structure",
//     priority:"high",
//     status:"todo",
//     createdAt:new Date(),
// };

// const task2:Task={
//     id:"2",
//     title:"Implement task management",
//     priority:"medium",
//     status:"in-progress",
//     createdAt:new Date(),
// }

// const task3:Task={
//     id:"3",
//     title:"Write unit tests",
//     priority:"low",
//     status:"to-do",
//     assignedTo:"user1",
//     createdAt:new Date(),
// };

// store.addTask(task1);
// store.addTask(task2);
// store.addTask(task3);

// console.log("---Todo tasks---");
// console.log(store.getByStatus(StatusEnum.Todo));

// //update task
// console.log("---Updating task status---");
// store.updateStatus("1", StatusEnum.InProgress);
// console.log(store.getByStatus(StatusEnum.InProgress));

// //log all tasks
// console.log("---All tasks---");
// console.log(store.getAll());

// //call the function 
// console.log(describeTask(task3));



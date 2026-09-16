"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var repository_js_1 = require("./repository.js");
var taskRepo = new repository_js_1.Repository();
taskRepo.add({
    id: "1",
    title: "Test generics",
    priority: "high",
    status: "to-do",
    createdAt: new Date(),
});
console.log(taskRepo.getAll());
console.log(taskRepo.getById("1"));
taskRepo.update("1", { status: "in-progress" });
console.log(taskRepo.getById("1"));
var userRepo = new repository_js_1.Repository();
userRepo.add({ id: "1", name: "John Doe", email: "john.doe@example.com" });
console.log(userRepo.getAll());
// const store=new TaskStore();
// const task1:Task={
//     id:"1",
//     title:"Setup project structure",
//     priority:"high",
//     status:"to-do",
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

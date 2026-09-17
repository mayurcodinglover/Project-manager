import express, { response } from 'express';
import type {Request,Response} from 'express';
import {describeTask, TaskStore} from "./store.js";
import type { Status,Task } from "./types.js";
import {CreateTaskSchema} from "./schema.js";
import {TaskRepository} from "./repository.js";
import "dotenv/config";
import cors from "cors";

const taskRepo=new TaskRepository();

const taskByStatus:Record<Status,Task[]>={
  "todo":[],
  "inprogress":[],
  "done":[]
}
taskRepo.getAll().then(tasks => {
  tasks.forEach(task => {
    taskByStatus[task.status].push(task);
  });
  console.log("--- Tasks grouped by status ---");
console.log(taskByStatus);
});

const app=express();
app.use(express.json());
app.use(cors());

const store=new TaskStore();



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

app.get("/tasks",async (req:Request,res:Response)=>{
    res.json(await taskRepo.getAll());
})
app.get("/tasks/:status",async(req:Request<{status:Status}>,res:Response)=>{
    const tasks=await taskRepo.getAll();
    res.json(tasks.filter(task=>task.status===req.params.status));
})
app.post("/tasks",async (req:Request,res:Response)=>{
    const result=CreateTaskSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({error:result.error.flatten()});
    }
    
    const newTask=await taskRepo.add({
        title:result.data.title,
        priority:result.data.priority,
        description:result.data.description ?? null,
        assignedTo:result.data.assignedTo ?? null
    });
    res.status(201).json(newTask);
    });
app.patch("/tasks/:id",async(req:Request<{id:string}>,res:Response)=>{
    try {
        const updated=await taskRepo.update(req.params.id,req.body);
        res.json(updated);
    } catch (error) {
        res.status(404).json({error:"Task not found"})
    }
})
app.delete("/tasks/:id",async(req:Request<{id:string}>,res:Response)=>{
    const task=await taskRepo.getById(req.params.id);
    if(!task){
        return res.status(404).json({error:"Task not found"});
    }
    await taskRepo.delete(req.params.id);
    res.status(204).send();
})

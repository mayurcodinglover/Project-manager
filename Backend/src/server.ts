import express, { response } from 'express';
import type {Request,Response} from 'express';
import {describeTask, TaskStore} from "./store.js";
import type { Status,Task } from "./types.js";
import {CreateTaskSchema} from "./schema.js";
import {TaskRepository} from "./repository.js";
import "dotenv/config";
import cors from "cors";
import { prisma } from "./prisma.js";
import { CreateUserSchema } from './user.schema.js';
import { UserRepository } from './user.repository.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET=process.env.JWT_SECRET ?? "testsecret";

const userRepo=new UserRepository();


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
    const tasks=await prisma.task.findMany({include:{user:true}})
    res.json(tasks);
})
app.get("/users",async(req:Request,res:Response)=>{
    res.json(await userRepo.getAll());
})

app.post("/users",async(req:Request,res:Response)=>{
    const result=CreateUserSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({error:result.error.flatten()});
    }
    const newUser=await userRepo.add(result.data);
    res.status(201).json(newUser);
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
        description:result.data.description ?? "",
        status:result.data.status,
        assignedTo:result.data.assignedTo ?? ""
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

app.post("/auth/signup",async(req:Request,res:Response)=>{
    const {name,email,password}=req.body;
    const hashed=await bcrypt.hash(password,10);
    const user=await prisma.user.create({data:{name,email,password:hashed}});
    res.status(201).json({id:user.id,name:user.name,email:user.email});
})
interface JwtPayload{
    userId:string;
    email:string;
}
app.post("/auth/login",async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    const user=await prisma.user.findUnique({where:{email}});
    if(!user){
        return res.status(401).json({error:"Invalid credentials"});
    }
    const valid=await bcrypt.compare(password,user.password);
    if(!valid){
        return res.status(401).json({error:"Invalid credentials"});
    }
    const payload:JwtPayload={userId:user.id,email:user.email};
    const token=jwt.sign(payload,JWT_SECRET,{expiresIn:"1h"});
    res.json({token});
})

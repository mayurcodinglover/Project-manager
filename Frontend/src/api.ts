import type {Task} from "./types.js";

const API_URL="http://localhost:3000";

export async function fetchTask():Promise<Task[]>{
    const response=await fetch(`${API_URL}/tasks`);
    if(!response.ok){
        throw new Error("Failed to fetch tasks");
    }
    return response.json();
}

export interface CreateTaskInput{
    title:string;
    description?:string;
    assignedTo?:string;
    priority:"low"|"medium"|"high";
}

export async function createTask(input:CreateTaskInput):Promise<Task>{
    const res=await fetch(`${API_URL}/tasks`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(input)
    });
    if(!res.ok){
        throw new Error("Failed to create task");
    }
    return res.json();
}

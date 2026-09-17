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

export async function updateTask(id:string,updates:Partial<CreateTaskInput &{status:Task["status"]}>):Promise<Task>{
    const res=await fetch(`${API_URL}/tasks/${id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(updates)
    });
    if(!res.ok) throw new Error(`Failed to update task:${res.status}`);
    return res.json()
}

export async function deleteTask(id:string):Promise<void>{
    const res=await fetch(`${API_URL}/tasks/${id}`,{
        method:"DELETE",
    });
    if(!res.ok) throw new Error(`Failed to delete task ${res.status}`);
}
import type { Task, Status } from "./types.js";

export class TaskStore {
    private tasks:Task[]=[];

    addTask(task:Task):void{
        this.tasks.push(task);
    }
    getByStatus(status:Status):Task[]{
        return this.tasks.filter(task=>task.status===status);
    }

    updateStatus(id:string,newStatus:Status):Task | undefined{
        const task=this.tasks.find(task=>task.id===id);
        if(task){
            task.status=newStatus;
            return task;
        }
    }
    getAll():Task[]{
        return this.tasks;
    }
}
export function describeTask(task:Task):string{
    switch(task.status){
        case "todo":
            return `Task ${task.title} is in the to-do list.`;
        case "inprogress":
            return `Task ${task.title} is currently in progress.`;
        case "done":
            return `Task ${task.title} has been completed.`;
        default:
            return `Task ${task.title} has an unknown status.`;
    }
}

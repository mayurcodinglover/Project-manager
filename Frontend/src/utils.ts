import type {Task,Status} from "./types"

export function groupByStatus(tasks:Task[]):Record<Status,Task[]>{
    const grouped:Record<Status,Task[]>={
        todo:[],
        inprogress:[],
        done:[],
    };
    tasks.forEach((task)=>{
        grouped[task.status].push(task);
    })
    return grouped;
}
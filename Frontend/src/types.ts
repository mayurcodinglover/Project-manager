export type Status="todo" | "inprogress" | "done";
export interface Task {
    id:string;
    title:string;
    description:string;
    priority:"low"|"medium"|"high";
    status:Status;
    assignedTo?:string;
    createdAt:string;
}

export type FetchState=
| {status:"loading"}
| {status:"error";message:string}
| {status:"success";tasks:Task[]};
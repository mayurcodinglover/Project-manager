export interface Task {
    id:string;
    title:string;
    description:string;
    priority:"low"|"medium"|"high";
    status:"todo"|"inprogress"|"done";
    assignedTo?:string;
    createdAt:string;
}

export type FetchState=
| {status:"loading"}
| {status:"error";message:string}
| {status:"success";tasks:Task[]};
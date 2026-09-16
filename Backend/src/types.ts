export type Priority="low"|"medium"|"high";
export type Status="todo"|"inprogress"|"done";


export interface BaseEntity {
    id: string;
}
export interface Task extends BaseEntity{
    title:string;
    description?:string | null;
    priority:Priority;
    status:Status;
    createdAt:Date;
    assignedTo?:string | null;
}

export interface User extends BaseEntity{
    name:string;
    email:string;
}

export interface A {
    description? : string;
}
export interface B {
    description : string | undefined;
}

import type {BaseEntity} from "./types.js";
import type {Task,CreateTaskInput,UpdateTaskInput} from "./types.js";
import { prisma } from "./prisma.js";
import { Prisma } from "@prisma/client";

type TaskWithUser = Prisma.TaskGetPayload<{
  include: {
    user: true;
  };
}>;
export class TaskRepository{
    async add(data:CreateTaskInput):Promise<TaskWithUser> {
        return prisma.task.create({data,include:{
            user:true
        }});
    }
    async getAll():Promise<TaskWithUser[]>{
        return prisma.task.findMany({include:{user:true}});
    }
    async getById(id:string):Promise<Task | null>{
        return prisma.task.findUnique({where:{id}});
    }
    async update(id:string,updates:Partial<Task>):Promise<TaskWithUser>{
        return prisma.task.update({ where: { id }, data: updates, include: { user: true } });
}
    async delete(id:string):Promise<Task>{
        return prisma.task.delete({where:{id}});
    }
}

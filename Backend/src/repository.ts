import type {BaseEntity} from "./types.js";
import type {Task} from "./types.js";
import { prisma } from "./prisma.js";


export class TaskRepository{
    async add(data: Omit<Task,"id" | "createdAt" | "status">):Promise<Task> {
        return prisma.task.create({data});
    }
    async getAll():Promise<Task[]>{
        return prisma.task.findMany();
    }
    async getById(id:string):Promise<Task | null>{
        return prisma.task.findUnique({where:{id}});
    }
    async update(id:string,data:Partial<Omit<Task,"id" | "createdAt">>):Promise<Task>{
        return prisma.task.update({where:{id},data});
    }
    async delete(id:string):Promise<Task>{
        return prisma.task.delete({where:{id}});
    }
}

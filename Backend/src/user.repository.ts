import { PrismaClient} from "@prisma/client";
import type {User} from "@prisma/client"
import type { CreateUserInput } from "./user.schema.js";

const prisma=new PrismaClient();

export class UserRepository {
    async add(data:Omit<User,"id">:CreateUserInput):Promise<User>{
        return prisma.user.create({data});
    }
    async getAll():Promise<User[]>{
        return prisma.user.findMany();
    }
    async getById(id:string):Promise<User | null>{
        return prisma.user.findUnique({where:{id}});
    }
}
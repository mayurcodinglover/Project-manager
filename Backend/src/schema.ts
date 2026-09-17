import {z} from "zod";

export const CreateTaskSchema=z.object({
    title:z.string().min(1).max(100),
    priority:z.enum(["low","medium","high"]),
    description:z.string().max(500).optional(),
    assignedTo:z.string().optional()
});

export type CreateTaskInput=z.infer<typeof CreateTaskSchema>;
export const UpdateTaskSchema=CreateTaskSchema.partial();
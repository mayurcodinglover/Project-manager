import {useState} from 'react'
import type {CreateTaskInput} from './api'
import {createTask} from './api'
import type {Task,User} from './types.js'

interface TaskFormProps{
    onCreated:(task:Task)=>void;
    users:User[]
}

function TaskForm({onCreated,users}:TaskFormProps) {
    const [title,setTitle]=useState<string>("");
    const [priority,setPriority]=useState<CreateTaskInput["priority"]>("low");
    const [assignedTo, setAssignedTo] = useState<string>("");
    const [submitting,setSubmitting]=useState<boolean>(false);

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        if(!title.trim()) return;
        setSubmitting(true);
        try
        {
            const newTask=await createTask({title,priority,...(assignedTo && {assignedTo}),});
            onCreated(newTask);
            setAssignedTo("");
            setTitle("");
            setPriority("low");
        }
        catch(error)
        {
            console.error(error);
            alert("Failed to create task")
        }
        finally
        {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{marginBottom:"1.5rem"}}>

            <input
                type="text"
                value={title}
                placeholder="Task title"
                onChange={(e)=>setTitle(e.target.value)}
                />

                <select value={priority} onChange={(e)=>setPriority(e.target.value as CreateTaskInput["priority"])}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <select value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)}>
                     <option value="">Unassigned</option>
                    {users.map((u)=>{
                        return <>
                        <option id={u.id} value={u.id}>{u.name}</option>
                        </>
                    })}
                </select>
                <button type="submit" disabled={submitting}>
                    {submitting ? "Creating..." : "Create Task"}
                </button>
        </form>
    )
}

export default TaskForm
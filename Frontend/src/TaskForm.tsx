import {useState} from 'react'
import type {CreateTaskInput} from './api'
import {createTask} from './api'
import type {Task} from './types.js'

interface TaskFormProps{
    onCreated:(task:Task)=>void;
}

function TaskForm({onCreated}:TaskFormProps) {
    const [title,setTitle]=useState<string>("");
    const [priority,setPriority]=useState<CreateTaskInput["priority"]>("low");
    const [submitting,setSubmitting]=useState<boolean>(false);

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        if(!title.trim()) return;
        setSubmitting(true);
        try
        {
            const newTask=await createTask({title,priority});
            onCreated(newTask);
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

                <button type="submit" disabled={submitting}>
                    {submitting ? "Creating..." : "Create Task"}
                </button>
        </form>
    )
}

export default TaskForm
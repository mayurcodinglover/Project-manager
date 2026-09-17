import { useState,useEffect} from 'react'
import type { Task } from './types'
import { deleteTask, fetchTask, updateTask } from './api'
import TaskForm from './TaskForm'
import './App.css'

function App() {

  const [tasks,setTasks]=useState<Task[]>([]);
  const [loading,setLoading]=useState<boolean>(true);

  useEffect(()=>{
    fetchTask().then((data)=>{
      setTasks(data);
      setLoading(false);
    }).catch((error)=>{
      console.error(error);
      setLoading(false);
    })
  },[])
  function handleTaskCreated(newTask:Task){
    setTasks((prev)=>[...prev,newTask]);
  }
  if(loading){
    return <div>Loading...</div>
  }
  const handleStatusChange=async(id:string,status:Task["status"])=>{
    const updated=await updateTask(id,{status});
    setTasks((prev)=>prev.map((p)=>p.id===id?updated:p));
  }
  const handleDelete=async(id:string)=>{
    await deleteTask(id);
    setTasks((prev)=>prev.filter((t)=>t.id!==id));
  }
  return (
    <>
    <h1>Task Manager</h1>
    <TaskForm onCreated={handleTaskCreated}/>
    <ul>
      {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.priority}
            <select value={task.status} onChange={(e)=>handleStatusChange(task.id,e.target.value as Task["status"])}>
              <option value="todo">Todo</option>
              <option value="inprogress">Inprogress</option>
              <option value="done">Done</option>
            </select>
            <button onClick={()=>handleDelete(task.id)}>Delete</button>
          </li>
        ))}
    </ul>
    </>
  )
}

export default App

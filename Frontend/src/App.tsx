import { useState,useEffect} from 'react'
import type { Task,FetchState } from './types'
import { deleteTask, fetchTask, updateTask } from './api'
import TaskForm from './TaskForm'
import './App.css'

function App() {

  const [state, setState] = useState<FetchState>({status:"loading"});

  useEffect(()=>{
    fetchTask().then((data)=>{
      setState({status:"success",tasks:data})
    }).catch((error:unknown)=>{
      setState({status:"error",message:error instanceof Error ? error.message:"Something went wrong"});
    })
  },[])
  function handleTaskCreated(newTask:Task){
    if(state.status!=="success") return;
    setState({status:"success",tasks:[...state.tasks,newTask]})
  }
  const handleStatusChange=async(id:string,status:Task["status"])=>{
    if(state.status!=="success") return;
    const updated=await updateTask(id,{status})
    setState({status:"success",tasks:state.tasks.map((t)=>(t.id===id? updated:t))});
  }
  const handleDelete=async(id:string)=>{
    if(state.status!=="success") return;
    await deleteTask(id);
    setState({status:"success",tasks:state.tasks.filter((t)=>t.id!==id)});
  }
   if (state.status === "loading") return <p>Loading...</p>;
  if (state.status === "error") return <p style={{ color: "red" }}>Error: {state.message}</p>;
  return (
    <>
    <h1>Task Manager</h1>
    <TaskForm onCreated={handleTaskCreated}/>
    <ul>
      {state.tasks.map(task => (
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

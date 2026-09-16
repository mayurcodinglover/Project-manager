import { useState,useEffect} from 'react'
import type { Task } from './types'
import { fetchTask } from './api'
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
  return (
    <>
    <h1>Task Manager</h1>
    <TaskForm onCreated={handleTaskCreated}/>
    <ul>
      {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.priority} — {task.status}
          </li>
        ))}
    </ul>
    </>
  )
}

export default App

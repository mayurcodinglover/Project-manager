import { useState,useEffect} from 'react'
import type { Task,FetchState,Status } from './types'
import { deleteTask, fetchTask, updateTask } from './api'
import TaskForm from './TaskForm'
import './App.css'
import { groupByStatus } from './utils'

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
  const grouped=groupByStatus(state.tasks)
  const columns:{key:Status;label:string}[]=[
    {key:"todo",label:"To-do"},
    {key:"inprogress",label:"In progress"},
    {key:"done",label:"Done"},
  ];
   return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Tasks ({state.tasks.length})</h1>
      <TaskForm onCreated={handleTaskCreated} />
      <div style={{ display: "flex", gap: "1rem" }}>
        {columns.map((col) => (
          <div key={col.key} style={{ flex: 1, border: "1px solid #ccc", borderRadius: 8, padding: "0.75rem" }}>
            <h3>{col.label} ({grouped[col.key].length})</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {grouped[col.key].map((task) => (
                <li key={task.id} style={{ marginBottom: "0.5rem", padding: "0.5rem", background: "#f5f5f5", borderRadius: 4 }}>
                  <strong>{task.title}</strong> — {task.priority}
                  <div>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value as Status)}
                    >
                      <option value="todo">To-do</option>
                      <option value="inprogress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App

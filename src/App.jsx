import { useContext, useState, useMemo} from 'react';
import { TaskContext } from './context/TaskContext';
import './App.css'

function App() {
  const {tasks, dispatch}= useContext(TaskContext);
  const [input, setInput]= useState("");

  const [editId, setEditId]= useState(null);
  const [editText, setEditText]= useState("");

  const [filter, setFilter]= useState("ALL");

  const toggleTask=(id)=>{
    dispatch({
      type: "TOGGLE_TASK",
      payload: id
    });
  }

  const filteredTasks= useMemo(()=>{
    if(filter==="COMPLETED"){
      return tasks.filter((task)=> task.completed);
    }
    else if(filter==="PENDING"){
      return tasks.filter((task)=> !task.completed);
    }
    else{
      return tasks;
    }},
    [tasks, filter]
  );
  
 



  const addTask=()=>{
    if(input.trim()==="")return;
    dispatch({
    type: "ADD_TASK",
    payload: {
      id: Date.now(),
      text: input,
      completed: false
    },
  });
  
  setInput("");
};
    
  const deleteTask=(id)=>{
    dispatch({
      type: "DELETE_TASK",
      payload: id
    });
  };
 


  const startEdit=(task)=>{
    setEditId(task.id);
    setEditText(task.text);

  }
  const saveEdit=()=>{
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id: editId,
        text: editText
      }
    });
    setEditId(null);
    setEditText("");
  }
 
  return (
    <div className="App">
      <h1>Task State Management</h1>
      <div className="task-form">
        <input type="text"
         placeholder='Enter task' 
         value={input} 
         onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={addTask}>Add Task</button>
        </div>
      
      <div className="filters">
        <select value={filter} onChange={(e)=> setFilter(e.target.value)}>
          <option value="ALL">All Tasks</option>
          <option value="COMPLETED">Completed Task</option>
          <option value="PENDING">Pending Task</option>
        </select>
        <input type="text" placeholder="Type To Search..."></input>
      </div>
      <div className="task-list">
        {filteredTasks.map((task)=>(
          
          <div className="task-item" key={task.id}>
            <input type="checkbox"
            checked={task.completed}
            onChange={()=>toggleTask(task.id)}
            />
            {editId===task.id ?(
              <>
              <input
              value={editText}
              onChange={(e)=>setEditText(e.target.value)}
              />
              <button onClick={saveEdit}>Save</button>  
              </>
            ): (
            <>
              <span>{task.text}</span>
              <p>{task.completed ? "Completed" : "Pending"}</p>
              <button onClick={() => startEdit(task)}>Edit</button>
            </>
          )}
            <button onClick={()=>deleteTask(task.id)}>Delete</button>
       </div>
        ))}

    </div>
    </div>
  );
}

export default App

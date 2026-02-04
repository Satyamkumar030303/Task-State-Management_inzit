import { useReducer, useState} from 'react';
import { taskReducer } from './reducer/taskReducer';
import './App.css'

function App() {
  const [tasks, dispatch]= useReducer(taskReducer, []);
  const [input, setInput]= useState("");

  const [editId, setEditId]= useState(null);
  const [editText, setEditText]= useState("");

  const addTask=()=>{
    if(input.trim()==="")return;
    dispatch({
    type: "ADD_Task",
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
      type: "DELETE_Task",
      payload: id
    });
  };
 


  const startEdit=(task)=>{
    setEditId(task.id);
    setEditText(task.text);

  }
  const saveEdit=()=>{
    dispatch({
      type: "EDIT_Task",
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
        <select>
          <option>All Tasks</option>
          <option>Completed Task</option>
          <option>Pending Task</option>
        </select>
        <input type="text" placeholder="Type To Serch..."></input>
      </div>
      <div className="task-list">
        {tasks.map((task)=>(
          <div className="task-item" key={task.id}>
            <input type="checkbox"></input>
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

import { useContext, useState, useMemo} from 'react';
import { TaskContext } from './context/TaskContext';
import TaskItem from "./components/TaskItem";
import { useRef, useEffect } from 'react';
import { useDebounce } from "./hooks/useDebounce";
import './App.css'


function App() {

  console.log("App rendered");

  const {tasks, dispatch}= useContext(TaskContext);
  const [input, setInput]= useState("");

  const [editId, setEditId]= useState(null);
  const [editText, setEditText]= useState("");

  const [filter, setFilter]= useState("ALL");

  const [search, setSearch]= useState("");

  const debouncedSearch = useDebounce(search, 500);

  const searchRef= useRef(null);
   useEffect(()=>{
    searchRef.current.focus();
   },[]);

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

    else if(debouncedSearch.trim()!==""){
      return tasks.filter((task)=>
        task.text.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    else{
      return tasks;
    }},
    [tasks, filter, debouncedSearch]
    
  );
  const completedCount= useMemo(()=>{
    return tasks.filter((task)=> task.completed).length;
  }, [tasks]);

  const pendingCount= useMemo(()=>{
    return tasks.filter((task)=> !task.completed).length;
  }, [tasks]);

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

  };
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
  };
 
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
        <input 
        ref={searchRef}
        type="text" 
        placeholder="Type To Search..."
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        ></input>
      </div>
      <div className="task-stats">
        <p> Completed: {completedCount}</p>
        <p> Pending: {pendingCount}</p>
      </div>
      <div className="task-list">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              startEdit={startEdit}
              deleteTask={deleteTask}
              editId={editId}
              editText={editText}
              setEditText={setEditText}
              saveEdit={saveEdit}
            />
          ))}
        
          </div>

    </div>
  );
}

export default App

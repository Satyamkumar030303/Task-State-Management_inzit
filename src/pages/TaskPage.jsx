import { useState, useMemo, useCallback} from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskItem from "../components/TaskItem";
import { useDebounce } from "../hooks/useDebounce";

import { useForm } from 'react-hook-form';


function App() {

  console.log("App rendered");

  const {tasks, dispatch}= useTasks();
  // const [input, setInput]= useState("");

  const [editId, setEditId]= useState(null);
  const [editText, setEditText]= useState("");

  const [filter, setFilter]= useState("ALL");
  const [search, setSearch]= useState("");

  const debouncedSearch = useDebounce(search, 500);

  // const searchRef= useRef(null);
  //  useEffect(()=>{
  //   searchRef.current.focus();
  //  },[]);

  
  const filteredTasks= useMemo(()=>{
    let result= tasks;
    if(filter==="COMPLETED"){
      return tasks.filter((task)=> task.completed);
    }
    if(filter==="PENDING"){
      return tasks.filter((task)=> !task.completed);
    }

    if(debouncedSearch.trim()!==""){
      return tasks.filter((task)=>
        task.text.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    
      return result;
    },
    [tasks, filter, debouncedSearch]
    
  );
  const completedCount= useMemo(()=>{
    return tasks.filter((task)=> task.completed).length;
  }, [tasks]);

  const pendingCount= useMemo(()=>{
    return tasks.filter((task)=> !task.completed).length;
  }, [tasks]);

  const form = useForm();
  const { register, handleSubmit, reset, formState } = form;
  const { errors}= formState;

  const addTask = (data) => {
    if (!data.task.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        text: data.task,
        completed: false
      }
    });
    reset();
  };

const toggleTask=useCallback((id)=>{
    dispatch({
      type: "TOGGLE_TASK",
      payload: id
    });
  },[dispatch]);

    
  const deleteTask=useCallback((id)=>{
    dispatch({
      type: "DELETE_TASK",
      payload: id
    });
  }, [dispatch]);
 


  const startEdit=useCallback((task)=>{
    setEditId(task.id);
    setEditText(task.text);
  },[]);

  const saveEdit=useCallback(()=>{
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id: editId,
        text: editText
      }
    });
    setEditId(null);
    setEditText("");
  }, [dispatch, editId, editText]);




 
  return (
    <>
    
    <div className="App">
      <h1>Task State Management</h1>
       
      <form className="task-form" onSubmit={handleSubmit(addTask)} noValidate>
        <input 
        type="text"
         placeholder='Enter task' 
         {...register("task", { required: "Task is required",
          minLength: { value: 3, message: "Task must be at least 3 characters long"},
           pattern: {
            value: /^(?=.*[a-zA-Z0-9]).+$/,
              message: "Task must contain at least one letter or number"},
              })}/>
          <p style={{ color: "red" }}>{errors.task?.message}</p>
        <button type="submit">Add Task</button>
      </form>
        
      
      {/* <div className="filters">
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
      </div> */}
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
    </>
  );
}

export default App

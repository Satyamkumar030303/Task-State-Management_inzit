import React, {useRef, useEffect} from "react";


function Navbar({filter, setFilter, search, setSearch}){
    console.log("Navbar rendered");
    const searchRef= useRef(null);
    useEffect(()=>{
        searchRef.current.focus();
    },[]);
    return (
        <nav className="navbar">
            <h2>Task Manager</h2>

           <div className="nav-actions">
            <button
            className={filter === "ALL" ? "active" : ""}
             onClick={()=> setFilter("ALL")}>
             All
             </button>

             <button
                className={filter === "COMPLETED" ? "active" : ""}  
                onClick={()=> setFilter("COMPLETED")}>
                Completed
             </button>

             <button
                className={filter === "PENDING" ? "active" : ""}  
                onClick={()=> setFilter("PENDING")}>
                Pending
             </button>
                <input 
                ref={searchRef}
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                />
            
           </div>
        </nav>
    )
} 
export default React.memo(Navbar);
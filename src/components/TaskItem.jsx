import React from "react";

const TaskItem = React.memo(function TaskItem({
  task,
  toggleTask,
  startEdit,
  deleteTask,
  editId,
  editText,
  setEditText,
  saveEdit,
}) {
  console.log("TaskItem rendered", task.id);

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      {editId === task.id ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <p>{task.completed ? "Completed" : "Pending"}</p>
          <button onClick={() => startEdit(task)}>Edit</button>
        </>
      )}

      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
});

export default TaskItem;

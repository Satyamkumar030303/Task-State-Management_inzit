import { Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import "./dashboard.css";

function Dashboard() {
   console.log("DASHBOARD RENDERED");
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="card">
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{completed}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>
      </div>

      <Link to="/tasks" className="go-tasks">
        Go to Task Manager →
      </Link>
    </div>
  );
}

export default Dashboard;

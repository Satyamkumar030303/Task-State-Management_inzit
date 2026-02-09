import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/dashboard", { replace: true });
  };

  return (
    <nav className="navbar">
      <h3>Task Manager</h3>

      <div className="nav-actions">
        <Link to="/dashboard">Dashboard</Link>

        {isAuth ? (
          <>
            
            <Link to="/tasks">Tasks</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>  
        )}
      </div>
    </nav>
  );
}

export default Navbar;

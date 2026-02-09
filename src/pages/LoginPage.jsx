import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [userId, setUserId] = useState("");

  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // if user already logged in → never show login page
  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  const from = location.state?.from?.pathname;

  const handleLogin = () => {
    if (!userId.trim()) return;

    login(userId);

    const redirectTo =
      from || localStorage.getItem("lastRoute") || "/dashboard";

    navigate(redirectTo, { replace: true });
  };

  console.log("LOGIN PAGE RENDERED");

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>Task State Management App</p>
    </div>
  );
}

export default LoginPage;

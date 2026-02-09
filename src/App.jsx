import { Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "./components/layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/TaskPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'
import LoginPage from "./pages/LoginPage";

// const Dashboard = lazy(() => import('./pages/Dashboard'));

 function App() {
   const lastRoute = localStorage.getItem("lastRoute");

  return (
    <Routes>
      <Route element={<MainLayout />}>
       <Route
          path="/"
          element={
            lastRoute ? (
              <Navigate to={lastRoute} replace />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route path="*" element={<h2>Page not found</h2>} />
        <Route path="/" element={<Dashboard />} />
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" 
        element={
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>} />
      </Route>
    </Routes>
   
  );
}

export default App;

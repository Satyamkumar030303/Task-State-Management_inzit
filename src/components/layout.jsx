import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer style={{ 
        padding: '1rem', 
        background: '#f9f9f9', 
        borderTop: '1px solid #ddd',
        textAlign: 'center'
      }}>
        <p>Task State Mangement APP...</p>
      </footer>
    </>
  );
}

export default MainLayout;



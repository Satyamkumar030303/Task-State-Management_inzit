import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  // restore auth on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setIsAuth(true);
      setUser(savedUser);
    }
  }, []);

  const login = (userId) => {
    setIsAuth(true);              // ✅ NOW DEFINED
    setUser(userId);
    localStorage.setItem("user", userId);
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

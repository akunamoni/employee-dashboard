import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const ADMIN = {
  username: "admin",
  password: "admin123",
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    () => localStorage.getItem("isAuth") === "true"
  );

  const login = (username, password) => {
    if (
      username === ADMIN.username &&
      password === ADMIN.password
    ) {
      setIsAuth(true);
      localStorage.setItem("isAuth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

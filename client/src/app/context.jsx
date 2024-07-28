"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [mainColor, setMainColor] = useState("text-purple-1");

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;
    setToken(token);
    setUserId(userId);
  }, []);

  return (
    <AppContext.Provider
      value={{
        token,
        userId,
        mainColor,
        setMainColor,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a User Context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: !!localStorage.getItem('token') // Check if token exists in localStorage
  });

  const login = (token) => {
    localStorage.setItem('token', token); // Save token to localStorage
    setUser({ isLoggedIn: true, token });
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser({ isLoggedIn: false, token: null });
  };

  useEffect(()=>{

    createContext();

  },[user])

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User Context
export const useUser = () => useContext(UserContext);

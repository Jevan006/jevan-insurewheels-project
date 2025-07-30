import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children, showSnackbar }) => {
  // Initialize isLoggedIn from localStorage or default to false
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const navigate = useNavigate();

  const login = (username, password) => {
    // Simple hardcoded check for demonstration
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // Persist login state
      showSnackbar('Login successful!', 'success');
      navigate('/dashboard'); // Navigate to dashboard on success
      return true;
    } else {
      showSnackbar('Invalid credentials!', 'error');
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login state
    showSnackbar('Logged out successfully!', 'info');
    navigate('/login'); // Navigate back to login page on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

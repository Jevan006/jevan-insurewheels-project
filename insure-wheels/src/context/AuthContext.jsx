import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from './SnackbarContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const login = (username, password) => {
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      showSnackbar('Login successful!', 'success');
      navigate('/dashboard');
      return true;
    } else {
      showSnackbar('Invalid credentials!', 'error');
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    showSnackbar('Logged out successfully!', 'info');
    navigate('/login');
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

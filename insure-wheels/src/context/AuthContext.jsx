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
    if (username === 'jevan' && password === 'jevan006') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      showSnackbar('Login successful!', 'success');
      navigate('/dashboard');
      return true;
    } else {
      showSnackbar('Wrong password. Are you a scammer or did you just forget it?', 'error');
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

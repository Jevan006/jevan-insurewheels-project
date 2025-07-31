import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from './SnackbarContext';

const AuthContext = createContext(null);

let HARDCODED_USERNAME = 'Jevan';
let HARDCODED_PASSWORD = 'Jevanpeters006!';
// Password Regex
// Requires:
// - At least 8 characters long
// - At least one lowercase letter (a-z)
// - At least one uppercase letter (A-Z)
// - At least one digit (0-9)
// - At least one special character from the set: @$!%*?&
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const login = (username, password) => {
    if (!username || !password) {
      showSnackbar('Username and password are required.', 'error');
      return false;
    }

    if (!passwordRegex.test(password)) {
      showSnackbar(
        'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.',
        'error'
      );
      return false;
    }

    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      showSnackbar('Login successful!', 'success');
      navigate('/dashboard'); // Navigate to dashboard on successful login
      return true;
    } else {
      showSnackbar('Invalid username or password!', 'error');
      return false;
    }
  };

  // Function to change the hardcoded password
  const changePassword = (currentPassword, newPassword) => {
    if (currentPassword !== HARDCODED_PASSWORD) {
      showSnackbar('Incorrect current password.', 'error');
      return false;
    }

    if (!passwordRegex.test(newPassword)) {
      showSnackbar(
        'New password does not meet requirements (must be at least 8 chars, include uppercase, lowercase, number, and special char).',
        'error'
      );
      return false;
    }

    // Update the hardcoded password
    HARDCODED_PASSWORD = newPassword;
    showSnackbar('Password changed successfully!', 'success');
    return true;
  };

  // Function to change the hardcoded username
  const changeUsername = (newUsername) => {
    if (!newUsername || newUsername.length < 3) {
      showSnackbar('New username must be at least 3 characters long.', 'error');
      return false;
    }

    // Update the hardcoded username
    HARDCODED_USERNAME = newUsername;
    showSnackbar('Username changed successfully!', 'success');
    return true;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, changePassword, changeUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

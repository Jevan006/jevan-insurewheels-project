import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Assuming you have a theme.js or theme.jsx file
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './context/SnackbarContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* SnackbarProvider should wrap AuthProvider so AuthProvider can use useSnackbar */}
        <SnackbarProvider>
          {/* AuthProvider wraps App to provide authentication context to the entire application */}
          <AuthProvider>
            <App />
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

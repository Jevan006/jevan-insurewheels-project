// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './style.css'; // Your global styles

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Assuming your custom theme is defined and exported from src/theme.js or src/theme.jsx
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { CssBaseline } from '@mui/material'; // Import CssBaseline

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Provides routing context to the entire app */}
      <ThemeProvider theme={theme}> {/* Provides Material-UI theme */}
        <CssBaseline /> {/* Resets CSS to a consistent baseline across browsers */}
        <SnackbarProvider> {/* Provides Snackbar context for notifications */}
          <AuthProvider> {/* Provides authentication context */}
            <App /> {/* Your main application component */}
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

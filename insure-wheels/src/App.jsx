import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from './context/AuthContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Page components
import Dashboard from './pages/Dashboard';
import NewVehicle from './pages/NewVehicle';
import EditVehicle from './pages/EditVehicle';
import Quotes from './pages/Quotes';
import ConfirmQuote from './pages/ConfirmQuote';
import LoginPage from './pages/LoginPage';

// ProtectedRoute component to guard routes
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { isLoggedIn, logout } = useAuth();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = isXs ? '56px' : '64px'; // Default AppBar height for mobile vs desktop
  const location = useLocation();

  const backgroundImage = 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        },
      }}
    >
      {/* AppBar (Navigation Bar) - Always visible */}
      <AppBar position="static" sx={{ zIndex: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Link to dashboard if logged in, otherwise to login page */}
            {isLoggedIn ? (
              <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                InsureWheels
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                InsureWheels
              </Link>
            )}
          </Typography>
          {/* Navigation buttons based on login status */}
          {!isLoggedIn ? (
            // If not logged in, 'Login' button is the primary navigation
            <Button color="inherit" component={Link} to="/login">Login</Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" component={Link} to="/vehicles/new">Add Vehicle</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <Box
        sx={{
          flexGrow: 1,
          zIndex: 2,
          position: 'relative',
          paddingTop: (location.pathname !== '/login') ? appBarHeight : 0,
          paddingBottom: theme.spacing(4),
          px: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: (location.pathname === '/login') ? 'center' : 'flex-start',
          width: '100%',
        }}
      >
        <Routes>
          {/* The root path "/" now directly renders the LoginPage */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/vehicles/new" element={<ProtectedRoute><NewVehicle /></ProtectedRoute>} />
          <Route path="/vehicles/:id/edit" element={<ProtectedRoute><EditVehicle /></ProtectedRoute>} />
          <Route path="/quotes/:vehicleId" element={<ProtectedRoute><Quotes /></ProtectedRoute>} />
          <Route path="/confirm" element={<ProtectedRoute><ConfirmQuote /></ProtectedRoute>} />

          {/* Fallback for unmatched routes - redirect to login if not logged in, else dashboard */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;

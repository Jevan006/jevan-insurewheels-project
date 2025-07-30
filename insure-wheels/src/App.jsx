// src/App.jsx
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from './context/AuthContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Import your page components
import Dashboard from './pages/Dashboard';
import NewVehicle from './pages/NewVehicle';
import EditVehicle from './pages/EditVehicle';
import Quotes from './pages/Quotes';
import ConfirmQuote from './pages/ConfirmQuote';
import LoginPage from './pages/LoginPage';

// ProtectedRoute Component: A wrapper to protect routes
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
  // Determine AppBar height dynamically based on breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = isXs ? '56px' : '64px'; // Default AppBar height for mobile vs desktop

  // URL for a placeholder car image. You can replace this with your own image URL.
  const backgroundImage = 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the background covers the full viewport height
        // Apply background properties always
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '&::before': { // Pseudo-element for the blur effect
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly darker overlay for better text readability
          zIndex: 0,
        },
      }}
    >
      {/* AppBar (Navigation Bar) - Conditionally rendered only if the user is logged in */}
      {isLoggedIn && (
        <>
          <AppBar position="static" sx={{ zIndex: 2 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                  InsureWheels
                </Link>
              </Typography>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" component={Link} to="/vehicles/new">Add Vehicle</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
          </AppBar>

          {/* "InsureWheels" Text Heading - Appears only when logged in */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              textAlign: 'center',
              pointerEvents: 'none',
              maxWidth: '90%',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
              }}
            >
              InsureWheels
            </Typography>
          </Box>
        </>
      )}

      {/* Routes Definition - This Box will contain your page content */}
      <Box
        sx={{
          flexGrow: 1,
          zIndex: 2,
          position: 'relative',
          paddingTop: isLoggedIn ? appBarHeight : 0,
          paddingBottom: isLoggedIn ? theme.spacing(4) : 0,
          px: theme.spacing(2), // Keep universal horizontal padding for content area
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // <--- IMPORTANT: This centers all content horizontally
          justifyContent: isLoggedIn ? 'flex-start' : 'center', // Center vertically only for login page
          width: '100%', // Ensure this Box takes full available width
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/vehicles/new" element={<ProtectedRoute><NewVehicle /></ProtectedRoute>} />
          <Route path="/vehicles/:id/edit" element={<ProtectedRoute><EditVehicle /></ProtectedRoute>} />
          <Route path="/quotes/:vehicleId" element={<ProtectedRoute><Quotes /></ProtectedRoute>} />
          <Route path="/confirm" element={<ProtectedRoute><ConfirmQuote /></ProtectedRoute>} />
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;

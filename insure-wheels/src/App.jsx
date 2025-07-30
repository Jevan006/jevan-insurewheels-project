import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'; // Import Box
import { useAuth } from './context/AuthContext';

// Import your page components
import Dashboard from './pages/Dashboard';
import NewVehicle from './pages/NewVehicle';
import EditVehicle from './pages/EditVehicle';
import Quotes from './pages/Quotes';
import ConfirmQuote from './pages/ConfirmQuote';
import LoginPage from './pages/LoginPage';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { isLoggedIn, logout } = useAuth();

  // URL for a placeholder car image. You can replace this with your own image URL.
  const backgroundImage = 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh', // Ensure the background covers the full viewport height
        display: 'flex',
        flexDirection: 'column',
        // Apply background properties here if logged in
        ...(isLoggedIn && {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Makes the background scroll with content
          position: 'relative', // Needed for absolute positioning of blur and text overlay
          '&::before': { // Pseudo-element for the blur effect
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(5px)', // Blur effect
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: slight overlay for better text readability
            zIndex: 0, // Ensure it's behind the content but above the image
          },
        }),
      }}
    >
      {/* AppBar (Navigation Bar) - Conditionally rendered only if the user is logged in */}
      {isLoggedIn && (
        <>
          <AppBar position="static" sx={{ zIndex: 2 }}> {/* Ensure AppBar is on top */}
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
              top: '50%', // Center vertically
              left: '50%', // Center horizontally
              transform: 'translate(-50%, -50%)', // Adjust for exact centering
              zIndex: 1, // Ensure it's above the blurred background
              textAlign: 'center',
              pointerEvents: 'none', // Allow clicks to pass through to elements below
              maxWidth: '90%', // Prevent text from going off screen on small devices
            }}
          >
            <Typography
              variant="h2" // Large heading
              sx={{
                color: 'white', // White text for contrast
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)', // Add shadow for readability
                fontWeight: 'bold',
                // Responsive font size
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              }}
            >
              InsureWheels
            </Typography>
          </Box>
        </>
      )}

      {/* Routes Definition - Wrapped in a Box to control its z-index and padding */}
      <Box
        sx={{
          flexGrow: 1, // Allows content area to grow and take available space
          zIndex: 2, // Ensure content is above the background and title
          position: 'relative', // Establish new stacking context
          paddingTop: isLoggedIn ? 0 : 0, // No specific padding if appbar is present, pages already have mt
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

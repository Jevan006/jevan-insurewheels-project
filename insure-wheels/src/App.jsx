import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Snackbar } from '@mui/material'; // Import AppBar, Toolbar, Box, Snackbar
import MuiAlert from '@mui/material/Alert'; // For customizable Alert inside Snackbar

// Import your page components
import Dashboard from './pages/Dashboard';
import NewVehicle from './pages/NewVehicle';
import EditVehicle from './pages/EditVehicle';
import Quotes from './pages/Quotes';
import ConfirmQuote from './pages/ConfirmQuote';

// Helper component for Snackbar Alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {
  // State for Snackbar notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error', 'warning', 'info'

  // Function to show a notification
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Function to close the notification
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}> {/* Use Box for overall layout */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              InsureWheels
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/vehicles/new">Add Vehicle</Button>
        </Toolbar>
      </AppBar>

      {/* Pass showSnackbar function to relevant components via props or context */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard showSnackbar={showSnackbar} />} />
        <Route path="/vehicles/new" element={<NewVehicle showSnackbar={showSnackbar} />} />
        <Route path="/vehicles/:id/edit" element={<EditVehicle showSnackbar={showSnackbar} />} />
        <Route path="/quotes/:vehicleId" element={<Quotes showSnackbar={showSnackbar} />} />
        <Route path="/confirm" element={<ConfirmQuote showSnackbar={showSnackbar} />} />
        <Route path="/" element={<Dashboard showSnackbar={showSnackbar} />} />
      </Routes>

      {/* Snackbar component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;

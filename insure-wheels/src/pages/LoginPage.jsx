import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext'; // Import useSnackbar

function LoginPage() { // No longer needs showSnackbar as a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar(); // Use showSnackbar from context

  const handleSubmit = (event) => {
    event.preventDefault();
    // The login function in AuthContext already calls showSnackbar,
    // so you don't need to call it directly here unless you want extra handling.
    login(username, password);
  };

  return (
    <Container component={Paper} elevation={6} sx={{
      p: 4,
      mt: 8,
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: 3
    }}>
      <Typography variant="h4" gutterBottom>
        Login to InsureWheels
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;

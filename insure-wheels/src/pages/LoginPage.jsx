import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <Container
      component={Paper}
      elevation={6}
      sx={{
        p: 4,
        maxWidth: '350px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: '12px',
        mx: 'auto',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        Login to InsureWheels
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          width: '100%',
          maxWidth: '300px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            borderRadius: '8px', // Rounded corners for button
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // reminder to change this if it does not look nice
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
            }
          }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;

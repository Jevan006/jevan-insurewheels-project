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
        maxWidth: '350px', // Makes the entire white container smaller
        width: '100%',      // Ensures responsiveness up to maxWidth
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centers content (Typography, Box form) horizontally within the container
        boxShadow: 3,
        borderRadius: '12px', // Rounded corners for the container
        mx: 'auto',          // Centers the container horizontally on the page
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
          maxWidth: '300px', // Limits the width of the form elements (TextFields, Button)
          mx: 'auto',        // Centers the form elements horizontally within the container
          display: 'flex',   // Use flexbox for vertical alignment of form elements
          flexDirection: 'column',
          alignItems: 'center', // Centers the TextField and Button if they are smaller than maxWidth
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth // Makes TextField take 100% of its parent Box's maxWidth (300px)
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // Removed maxWidth and width from here, as fullWidth combined with parent Box's maxWidth handles it
        />
        <TextField
          margin="normal"
          required
          fullWidth // Makes TextField take 100% of its parent Box's maxWidth (300px)
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
          fullWidth // Makes Button take 100% of its parent Box's maxWidth (300px)
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            borderRadius: '8px', // Rounded corners for button
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Subtle shadow
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


import React from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

function LoginPage() {
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();

  // Requires at least 8 characters, one uppercase, one lowercase, one number, and one special character.
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        passwordRegex,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      ),
  });

  // Initialising  Formik
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const success = await login(values.username, values.password);

      if (success) {
        showSnackbar('Login successful!', 'success');
      } else {
        showSnackbar('Are you a scammer, or did you just forget your password?', 'error');
      }
    },
  });

  return (
    <Container
      component={Paper}
      elevation={6}
      sx={{
        p: 4,
        maxWidth: '400px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: '12px', // Added rounded corners
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        Login to InsureWheels
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          sx={{ mb: 2 }}
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
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            borderRadius: '8px', // Added rounded corners for button
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
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

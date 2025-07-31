import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material'; // Assuming Material-UI

function ChangePasswordForm({ onSubmit }) {
  // Define your password regex validation schema
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        passwordRegex,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values); // This function will handle sending data to your backend/auth service
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Change Password</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Current Password"
        type="password"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
        helperText={formik.touched.currentPassword && formik.errors.currentPassword}
      />
      <TextField
        fullWidth
        margin="normal"
        label="New Password"
        type="password"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Confirm New Password"
        type="password"
        name="confirmNewPassword"
        value={formik.values.confirmNewPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
        helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Change Password
      </Button>
    </Box>
  );
}

export default ChangePasswordForm;

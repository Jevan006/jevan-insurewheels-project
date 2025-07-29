import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  MenuItem // For select dropdown (e.g., color)
} from '@mui/material';
import { LoadingButton } from '@mui/lab'; // For buttons with loading state
import { Link } from 'react-router-dom';

// Install @mui/lab if you haven't already: npm install @mui/lab
// (This was not in the initial MUI install list, but useful for LoadingButton)

// Define the validation schema using Yup
const VehicleSchema = Yup.object().shape({
  make: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Make is required'),
  model: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Model is required'),
  year: Yup.number()
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear() + 1, `Year cannot be in the future (max ${new Date().getFullYear() + 1})`) // Allow current year + 1
    .required('Year is required')
    .typeError('Year must be a number'),
  vin: Yup.string()
    .matches(/^[A-HJ-NPR-Z0-9]{17}$/i, 'VIN must be 17 alphanumeric characters (excluding I, O, Q)') // Standard VIN pattern
    .required('VIN is required'),
  color: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Color is required'),
  mileage: Yup.number()
    .min(0, 'Mileage cannot be negative')
    .required('Mileage is required')
    .typeError('Mileage must be a number'),
});

// Dummy list of common car colors (you can expand this)
const colors = [
  'Red', 'Blue', 'Black', 'White', 'Silver', 'Gray', 'Green', 'Yellow', 'Orange', 'Brown', 'Purple'
];


function VehicleForm({ initialValues, onSubmit, isSubmitting, error }) {
  return (
    <Box sx={{ mt: 4, mb: 2, mx: 'auto', p: 3, maxWidth: 600, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        {initialValues.id ? 'Edit Vehicle' : 'Add New Vehicle'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Formik
        initialValues={initialValues}
        validationSchema={VehicleSchema}
        onSubmit={onSubmit}
        enableReinitialize={true} // Important for edit mode to update form when initialValues change
      >
        {({ errors, touched, values }) => (
          <Form>
            <Field
              as={TextField}
              name="make"
              label="Make"
              fullWidth
              margin="normal"
              error={touched.make && !!errors.make}
              helperText={touched.make && errors.make}
            />
            <Field
              as={TextField}
              name="model"
              label="Model"
              fullWidth
              margin="normal"
              error={touched.model && !!errors.model}
              helperText={touched.model && errors.model}
            />
            <Field
              as={TextField}
              name="year"
              label="Year"
              type="number"
              fullWidth
              margin="normal"
              error={touched.year && !!errors.year}
              helperText={touched.year && errors.year}
            />
            <Field
              as={TextField}
              name="vin"
              label="VIN"
              fullWidth
              margin="normal"
              error={touched.vin && !!errors.vin}
              helperText={touched.vin && errors.vin}
            />
            <Field
              as={TextField}
              name="color"
              label="Color"
              select // Makes it a select dropdown
              fullWidth
              margin="normal"
              error={touched.color && !!errors.color}
              helperText={touched.color && errors.color}
            >
              {colors.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Field>
            <Field
              as={TextField}
              name="mileage"
              label="Mileage"
              type="number"
              fullWidth
              margin="normal"
              error={touched.mileage && !!errors.mileage}
              helperText={touched.mileage && errors.mileage}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/dashboard"
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isSubmitting} // Show loading spinner
                loadingIndicator={<CircularProgress size={20} />}
              >
                {initialValues.id ? 'Save Changes' : 'Add Vehicle'}
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default VehicleForm;

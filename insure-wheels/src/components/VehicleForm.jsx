import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VehicleForm = ({ initialValues, onSubmit, isSubmitting, error }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.number()
      .typeError('Year must be a number')
      .required('Year is required')
      .min(1900, 'Year must be after 1900')
      .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
    vin: Yup.string()
      .required('VIN is required')
      .matches(/^[A-HJ-NPR-Z0-9]{17}$/, 'VIN must be 17 alphanumeric characters (excluding I, O, Q)'),
    color: Yup.string().required('Color is required'),
    mileage: Yup.number()
      .typeError('Mileage must be a number')
      .required('Mileage is required')
      .min(0, 'Mileage cannot be negative'),
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        {initialValues.id ? 'Edit Vehicle' : 'Add New Vehicle'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true} // Important for EditVehicle to load new initialValues
      >
        {({ errors, touched, isValid, dirty }) => (
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
              fullWidth
              margin="normal"
              error={touched.color && !!errors.color}
              helperText={touched.color && errors.color}
            />
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

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/dashboard')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isValid || !dirty} // Disable if submitting, invalid, or no changes
              >
                {isSubmitting ? 'Saving...' : (initialValues.id ? 'Update Vehicle' : 'Add Vehicle')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default VehicleForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { Container, Paper, Typography } from '@mui/material';
import { useSnackbar } from '../context/SnackbarContext'; // Import useSnackbar

function NewVehicle() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Get showSnackbar from context
  const { showSnackbar } = useSnackbar();

  // THIS IS YOUR CORRECT MOCKAPI.IO URL
  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles';

  const initialValues = {
    make: '',
    model: '',
    year: '',
    vin: '',
    color: '',
    mileage: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Send form values as JSON
      });

      if (!response.ok) {
        // Attempt to parse error message from response if available
        const errorText = await response.text(); // Get raw text to check for non-JSON
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            // If not JSON, use the raw text or default message
            errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Vehicle added successfully
      showSnackbar('Vehicle added successfully!', 'success'); // Show success notification
      resetForm(); // Clear the form
      navigate('/dashboard'); // Go back to the dashboard
    } catch (err) {
      setError(`Failed to add vehicle: ${err.message}`);
      showSnackbar(`Failed to add vehicle: ${err.message}`, 'error'); // Show error notification
      console.error('Error adding vehicle:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false); // Formik's internal submitting state
    }
  };

  return (
    <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
      <VehicleForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error} // Pass fetch/submission error to the form
      />
    </Container>
  );
}

export default NewVehicle;

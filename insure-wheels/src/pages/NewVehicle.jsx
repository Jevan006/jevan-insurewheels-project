import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { Container, Paper, Typography } from '@mui/material';

// ... (imports) ...

function NewVehicle({ showSnackbar }) { // Accept showSnackbar as prop
  // ... (existing state and API_URL) ...

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // ... (existing fetch logic) ...
      if (!response.ok) {
        // ... (existing error handling) ...
      }

      showSnackbar('Vehicle added successfully!', 'success'); // Show success notification
      resetForm();
      navigate('/dashboard');
    } catch (err) {
      setError(`Failed to add vehicle: ${err.message}`);
      showSnackbar(`Failed to add vehicle: ${err.message}`, 'error'); // Show error notification
      console.error('Error adding vehicle:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  // ... (return statement) ...

  return (
    <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
      <VehicleForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </Container>
  );
}

export default NewVehicle;

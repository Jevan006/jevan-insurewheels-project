import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { Container, Paper, Typography, CircularProgress, Alert } from '@mui/material';

// ... (imports) ...

function EditVehicle({ showSnackbar }) { // Accept showSnackbar as prop
  // ... (existing state and API_URL) ...

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // ... (existing fetch logic) ...
      if (!response.ok) {
        // ... (existing error handling) ...
      }

      showSnackbar('Vehicle updated successfully!', 'success'); // Show success notification
      navigate('/dashboard');
    } catch (err) {
      setError(`Failed to update vehicle: ${err.message}`);
      showSnackbar(`Failed to update vehicle: ${err.message}`, 'error'); // Show error notification
      console.error('Error updating vehicle:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  // ... (return statement) ...

  return (
    <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
      <VehicleForm
        initialValues={initialValues} // Pass the fetched data
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </Container>
  );
}

export default EditVehicle;

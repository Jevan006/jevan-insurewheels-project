import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { Container, Paper, Typography } from '@mui/material';
import { useSnackbar } from '../context/SnackbarContext';

function NewVehicle() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { showSnackbar } = useSnackbar();

  // MOCKAPI.IO URL
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
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      showSnackbar('Vehicle added successfully!', 'success');
      resetForm();
      navigate('/dashboard');
    } catch (err) {
      setError(`Failed to add vehicle: ${err.message}`);
      showSnackbar(`Failed to add vehicle: ${err.message}`, 'error');
      console.error('Error adding vehicle:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <Container
      component={Paper}
      elevation={3}
      maxWidth="sm"
      sx={{
        p: 4,
        boxSizing: 'border-box',
        mt: 4,
        mb: 4,
        ml: 'auto',
        mr: 'auto',
      }}
    >
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { Container, Paper, Typography } from '@mui/material';

function NewVehicle() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles'; // Same URL as in Dashboard.jsx

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
        body: JSON.stringify(values), // Send form values as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Vehicle added successfully
      resetForm(); // Clear the form
      navigate('/dashboard'); // Go back to the dashboard
    } catch (err) {
      setError(`Failed to add vehicle: ${err.message}`);
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
        error={error}
      />
    </Container>
  );
}

export default NewVehicle;

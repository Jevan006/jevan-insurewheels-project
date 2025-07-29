import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { Container, Paper, Typography, CircularProgress, Alert } from '@mui/material';

function EditVehicle() {
  const { id } = useParams(); // Get the vehicle ID from the URL
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null); // State to hold fetched vehicle data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles'; // Same URL as in Dashboard.jsx

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInitialValues(data); // Set the fetched data as initial values for the form
      } catch (err) {
        setError(`Failed to load vehicle: ${err.message}`);
        console.error('Error fetching vehicle:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]); // Re-fetch if the ID in the URL changes

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      navigate('/dashboard'); // Go back to the dashboard after successful update
    } catch (err) {
      setError(`Failed to update vehicle: ${err.message}`);
      console.error('Error updating vehicle:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading vehicle data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  if (!initialValues) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
        <Alert severity="warning">Vehicle not found or data is missing.</Alert>
      </Container>
    );
  }

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

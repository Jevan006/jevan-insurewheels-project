import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { Container, Paper, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useSnackbar } from '../context/SnackbarContext'; // Import useSnackbar


function EditVehicle() {
  const { id } = useParams(); // Get the vehicle ID from the URL
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null); // State to hold fetched vehicle data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get showSnackbar from context
  const { showSnackbar } = useSnackbar();

  // THIS IS YOUR CORRECT MOCKAPI.IO URL
  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles';

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`); // Fetch specific vehicle by ID
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
        const data = await response.json();
        setInitialValues(data); // Set the fetched data as initial values for the form
      } catch (err) {
        setError(`Failed to load vehicle: ${err.message}`);
        showSnackbar(`Failed to load vehicle: ${err.message}`, 'error'); // Show error notification
        console.error('Error fetching vehicle:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, API_URL, showSnackbar]); // Re-fetch if the ID or API_URL or showSnackbar changes

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError(null); // Clear previous errors
    try {
      // MockAPI.io often requires the ID in the body for PUT/PATCH, but primarily uses it in the URL
      // Filter out the 'id' from values before sending if MockAPI handles it automatically via URL
      const { id, ...dataToSend } = values; // Destructure id out, keep other data

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Send updated values as JSON (without the ID if MockAPI handles it)
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

      showSnackbar('Vehicle updated successfully!', 'success'); // Show success notification
      navigate('/dashboard'); // Go back to the dashboard after successful update
    } catch (err) {
      setError(`Failed to update vehicle: ${err.message}`);
      showSnackbar(`Failed to update vehicle: ${err.message}`, 'error'); // Show error notification
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
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
            Back to Dashboard
        </Button>
      </Container>
    );
  }

  if (!initialValues) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
        <Alert severity="warning">Vehicle not found or data is missing.</Alert>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
            Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
      <VehicleForm
        initialValues={initialValues} // Pass the fetched data
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error} // Pass fetch/submission error to the form
      />
    </Container>
  );
}

export default EditVehicle;

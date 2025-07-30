import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleForm from '../components/VehicleForm';
import { Container, Paper, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useSnackbar } from '../context/SnackbarContext';

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showSnackbar } = useSnackbar();

  // MOCKAPI.IO URL
  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles';

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
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
        setInitialValues(data);
      } catch (err) {
        setError(`Failed to load vehicle: ${err.message}`);
        showSnackbar(`Failed to load vehicle: ${err.message}`, 'error');
        console.error('Error fetching vehicle:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, API_URL, showSnackbar]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const { id, ...dataToSend } = values;

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
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

      showSnackbar('Vehicle updated successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(`Failed to update vehicle: ${err.message}`);
      showSnackbar(`Failed to update vehicle: ${err.message}`, 'error');
      console.error('Error updating vehicle:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container
        component={Paper}
        elevation={3}
        maxWidth="md"
        sx={{
          p: 4,
          mt: 2,
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading vehicle data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        component={Paper}
        elevation={3}
        maxWidth="md"
        sx={{
          p: 4,
          mt: 2,
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <Alert severity="error">Error: {error}</Alert>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
            Back to Dashboard
        </Button>
      </Container>
    );
  }

  if (!initialValues) {
    return (
      <Container
        component={Paper}
        elevation={3}
        maxWidth="md"
        sx={{
          p: 4,
          mt: 2,
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <Alert severity="warning">Vehicle not found or data is missing.</Alert>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
            Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container
      component={Paper}
      elevation={3}
      maxWidth="sm"
      sx={{
        p: 4,
        width: '100%',
        boxSizing: 'border-box',
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

export default EditVehicle;

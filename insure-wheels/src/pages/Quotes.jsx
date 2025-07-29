import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from '@mui/material';

function Quotes() {
  const { vehicleId } = useParams(); // Get the vehicle ID from the URL
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual MockAPI URL
  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles'; // Same URL as in Dashboard.jsx and others

  // Function to generate a random quote based on vehicle details
  const generateRandomQuote = useCallback((vehicle) => {
    if (!vehicle) return null;

    const basePrice = 500; // Starting point
    let calculatedPrice = basePrice;

    // Factors for randomizing the quote
    const makeFactor = vehicle.make.length * 5; // Simple example: longer make name, slightly higher price
    const yearFactor = (new Date().getFullYear() - vehicle.year) * 10; // Older car, slightly higher "risk" price
    const mileageFactor = Math.floor(vehicle.mileage / 1000) * 0.5; // Every 1000 miles adds a small amount
    const randomFluctuation = Math.random() * 200 - 100; // +/- 100

    calculatedPrice += makeFactor + yearFactor + mileageFactor + randomFluctuation;

    // Ensure price is not negative and round to 2 decimal places
    calculatedPrice = Math.max(100, calculatedPrice).toFixed(2);

    // Generate a random provider name
    const providers = ['InsurePro', 'SafeDrive', 'AutoGuard', 'RelianceSure', 'QuickCover'];
    const randomProvider = providers[Math.floor(Math.random() * providers.length)];

    // Generate a random plan type
    const plans = ['Basic', 'Standard', 'Premium'];
    const randomPlan = plans[Math.floor(Math.random() * plans.length)];


    return {
      id: Math.random().toString(36).substring(2, 11), // Simple unique ID for the quote
      provider: randomProvider,
      plan: randomPlan,
      price: parseFloat(calculatedPrice),
      details: `Coverage for ${vehicle.make} ${vehicle.model} (${vehicle.year}). Plan includes ${randomPlan} features.`,
    };
  }, []);

  useEffect(() => {
    const fetchVehicleAndGenerateQuotes = async () => {
      try {
        // 1. Fetch Vehicle Details
        const response = await fetch(`${API_URL}/${vehicleId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vehicleData = await response.json();
        setVehicle(vehicleData);

        // 2. Generate Quotes once vehicle data is available
        const generatedQuotes = Array.from({ length: 3 }).map(() => generateRandomQuote(vehicleData));
        setQuotes(generatedQuotes.sort((a, b) => a.price - b.price)); // Sort by price, cheapest first
      } catch (err) {
        setError(`Failed to load vehicle or generate quotes: ${err.message}`);
        console.error('Error in Quotes component:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleAndGenerateQuotes();
  }, [vehicleId, generateRandomQuote, API_URL]); // Re-run if vehicleId or generator changes

  const handleSelectQuote = (selectedQuote) => {
    // You would typically save the selected quote and vehicle info to state or context
    // and then navigate to the confirmation page.
    // For now, we'll pass it via navigate state.
    navigate('/confirm', { state: { selectedQuote, vehicle } });
  };

  if (loading) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading vehicle and generating quotes...</Typography>
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

  if (!vehicle) {
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
      <Typography variant="h4" gutterBottom align="center">
        Quotes for {vehicle.make} {vehicle.model} ({vehicle.year})
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        VIN: {vehicle.vin} | Color: {vehicle.color} | Mileage: {vehicle.mileage}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {quotes.map((quote) => (
          <Grid item xs={12} sm={6} md={4} key={quote.id}>
            <Card elevation={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                  {quote.provider}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Plan: {quote.plan}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ my: 2 }}>
                  R {quote.price}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {quote.details}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSelectQuote(quote)}
                  fullWidth
                >
                  Select This Quote
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
}

export default Quotes;

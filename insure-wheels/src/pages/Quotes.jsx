import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Chip // For displaying status
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { useSnackbar } from '../context/SnackbarContext'; // Import useSnackbar

function Quotes() {
  const { vehicleId } = useParams(); // Get vehicle ID from URL
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get showSnackbar from context
  const { showSnackbar } = useSnackbar();

  // THIS IS YOUR CORRECT MOCKAPI.IO URL for vehicles
  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles';

  // Define a separate URL for quotes (if you had one, for now it's mock data)
  const QUOTES_API_URL = 'https://example.com/api/quotes'; // This is just a placeholder, as quotes are simulated

  useEffect(() => {
    const fetchVehicleAndQuotes = async () => {
      try {
        // 1. Fetch Vehicle Details
        const vehicleResponse = await fetch(`${API_URL}/${vehicleId}`);
        if (!vehicleResponse.ok) {
          const errorText = await vehicleResponse.text();
          let errorMessage = `HTTP error! status: ${vehicleResponse.status}`;
          try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorMessage;
          } catch (e) {
              errorMessage = errorText || errorMessage;
          }
          throw new Error(`Failed to fetch vehicle: ${errorMessage}`);
        }
        const vehicleData = await vehicleResponse.json();
        setVehicle(vehicleData);

        // 2. Simulate Fetching Quotes
        // In a real app, you'd make an API call to a quotes service
        // For now, we generate mock quotes based on vehicle details.
        const generatedQuotes = [
          {
            id: 'quote1',
            provider: 'InsurePro',
            plan: 'Comprehensive Cover',
            price: (Math.random() * 5000 + 1500).toFixed(2), // Random price R1500 - R6500
            details: `Full cover including accident, theft, and third-party liability. Deductible R${(Math.random() * 500 + 1000).toFixed(0)}.`,
          },
          {
            id: 'quote2',
            provider: 'SafeDrive Insurance',
            plan: 'Third-Party, Fire & Theft',
            price: (Math.random() * 3000 + 1000).toFixed(2), // Random price R1000 - R4000
            details: `Covers third-party damage, fire, and theft. Limited accidental cover. Deductible R${(Math.random() * 300 + 800).toFixed(0)}.`,
          },
          {
            id: 'quote3',
            provider: 'BudgetGuard',
            plan: 'Third-Party Only',
            price: (Math.random() * 1500 + 500).toFixed(2), // Random price R500 - R2000
            details: `Basic cover for damages to other vehicles/property. No cover for your vehicle. Deductible R${(Math.random() * 200 + 500).toFixed(0)}.`,
          },
        ];
        setQuotes(generatedQuotes);

      } catch (err) {
        setError(err.message);
        showSnackbar(`Error: ${err.message}`, 'error');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleAndQuotes();
  }, [vehicleId, API_URL, showSnackbar]); // Dependencies

  const handleSelectQuote = (selectedQuote) => {
    navigate('/confirm', { state: { selectedQuote, vehicle } });
  };

  if (loading) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading vehicle and quotes...</Typography>
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
        <Alert severity="warning">Vehicle details not found.</Alert>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
            Back to Dashboard
        </Button>
      </Container>
    );
  }

  const formatPrice = (price) => {
    // Format as South African Rand (R)
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Insurance Quotes for Your {vehicle.make} {vehicle.model} ({vehicle.year})
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'secondary.main' }}>
            Vehicle Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List dense>
            <ListItem>
              <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
              <ListItemText primary="Make" secondary={vehicle.make} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Model" secondary={vehicle.model} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Year" secondary={vehicle.year} />
            </ListItem>
            <ListItem>
              <ListItemText primary="VIN" secondary={vehicle.vin} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Color" secondary={vehicle.color} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Mileage" secondary={vehicle.mileage} />
            </ListItem>
          </List>
        </Paper>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
        Available Quotes
      </Typography>

      <Grid container spacing={3}>
        {quotes.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mt: 2 }}>
              No quotes found for this vehicle.
            </Alert>
          </Grid>
        ) : (
          quotes.map((quote) => (
            <Grid item xs={12} md={4} key={quote.id}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                    {quote.provider}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    <ListItem disablePadding>
                      <ListItemIcon><CheckCircleOutlineIcon /></ListItemIcon>
                      <ListItemText primary="Plan" secondary={quote.plan} />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon><PriceCheckIcon /></ListItemIcon>
                      <ListItemText primary="Price" secondary={formatPrice(quote.price)} />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="Details" secondary={quote.details} />
                    </ListItem>
                  </List>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => handleSelectQuote(quote)}
                >
                  Select This Quote
                </Button>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
}

export default Quotes;

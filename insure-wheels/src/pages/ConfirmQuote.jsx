import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid, // ADDED: Grid import
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSnackbar } from '../context/SnackbarContext'; // Import useSnackbar

function ConfirmQuote() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedQuote, vehicle } = location.state || {};

  // Get showSnackbar from context
  const { showSnackbar } = useSnackbar();

  // Handle cases where state might be missing (e.g., direct navigation or refresh)
  if (!selectedQuote || !vehicle) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Alert severity="error">
          No quote or vehicle details found. Please select a vehicle and generate quotes first.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
          Go to Dashboard
        </Button>
      </Container>
    );
  }

  const handleConfirmPurchase = () => {
    // In a real application, you'd send this confirmation to a backend
    // For this project, we'll just show a success message and navigate
    showSnackbar(`Congratulations! Quote from ${selectedQuote.provider} confirmed.`, 'success');
    navigate('/dashboard');
  };

  const formatPrice = (price) => {
    // Ensure currency formatting matches your quotes page
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
        Confirm Your Insurance Quote
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Selected Quote Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon><VerifiedIcon /></ListItemIcon>
                <ListItemText primary="Provider" secondary={selectedQuote.provider} />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleOutlineIcon /></ListItemIcon>
                <ListItemText primary="Plan Type" secondary={selectedQuote.plan} />
              </ListItem>
              <ListItem>
                <ListItemIcon><PriceCheckIcon /></ListItemIcon>
                <ListItemText primary="Price" secondary={formatPrice(selectedQuote.price)} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Details" secondary={selectedQuote.details} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'secondary.main' }}>
              Vehicle Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
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
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(`/quotes/${vehicle.id}`)} // Go back to quotes page
        >
          Back to Quotes
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmPurchase}
        >
          Confirm Purchase
        </Button>
      </Box>
    </Container>
  );
}

export default ConfirmQuote;

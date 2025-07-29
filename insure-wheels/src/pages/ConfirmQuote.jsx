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
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import VerifiedIcon from '@mui/icons-material/Verified';

// ... (imports) ...

function ConfirmQuote({ showSnackbar }) { // Accept showSnackbar as prop
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedQuote, vehicle } = location.state || {};

  // ... (existing error handling for missing state) ...

  const handleConfirmPurchase = () => {
    // In a real application, you'd send this to a backend
    showSnackbar(`Congratulations! Quote from ${selectedQuote.provider} confirmed.`, 'success');
    navigate('/dashboard');
  };

  // ... (return statement) ...

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
                <ListItemText primary="Price" secondary={`$${selectedQuote.price}`} />
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

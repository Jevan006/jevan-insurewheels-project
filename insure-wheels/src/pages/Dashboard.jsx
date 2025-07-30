import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Button // For future actions like Add/Edit/Delete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'; // For navigation
import { useSnackbar } from '../context/SnackbarContext'; // Import useSnackbar

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Get showSnackbar from context
  const { showSnackbar } = useSnackbar();

  // THIS IS YOUR CORRECT MOCKAPI.IO URL
  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles';

  // useEffect hook to fetch vehicles when the component mounts
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          // Attempt to parse error message from response if available
          const errorText = await response.text(); // Get raw text to check for non-JSON
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorMessage;
          } catch (e) {
              // If not JSON, use the raw text or default message
              errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        setError(error.message);
        showSnackbar(`Error loading vehicles: ${error.message}`, 'error'); // Show error notification
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [API_URL, showSnackbar]); // Add API_URL and showSnackbar to dependencies

  // Function to handle vehicle deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
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
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id)); // Remove from UI
        showSnackbar('Vehicle deleted successfully!', 'success'); // Show success notification
      } catch (error) {
        setError(error.message);
        showSnackbar(`Failed to delete vehicle: ${error.message}`, 'error'); // Show error notification
        console.error(`Failed to delete vehicle: ${error.message}`);
      }
    }
  };

  // Filtered vehicles based on search term (make/model) and year filter
  const filteredVehicles = vehicles.filter(vehicle => {
    // Check if vehicle and its properties exist before accessing them
    if (!vehicle || !vehicle.make || !vehicle.model || !vehicle.year) {
      return false; // Skip invalid vehicle entries
    }

    const matchesSearch = searchTerm === '' ||
                          vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = filterYear === '' ||
                        String(vehicle.year) === String(filterYear); // Ensure comparison is string to string

    return matchesSearch && matchesYear;
  });

  // Render loading state
  if (loading) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading vehicles...</Typography>
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
        <Alert severity="error">Error loading vehicles: {error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
            Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Vehicle Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link} // Use Link component for navigation
          to="/vehicles/new"
        >
          Add New Vehicle
        </Button>
      </Box>

      {/* Search and Filter Inputs */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}> {/* flexWrap for responsiveness */}
        <TextField
          label="Search by Make/Model"
          variant="outlined"
          sx={{ flexGrow: 1 }} // Allows it to grow and take available space
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Filter by Year"
          variant="outlined"
          type="number" // To allow number input
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          sx={{ width: { xs: '100%', sm: '200px' } }} // Responsive width
        />
      </Box>

      {/* Conditional rendering for no vehicles found/available */}
      {filteredVehicles.length === 0 && (searchTerm !== '' || filterYear !== '') ? (
        <Alert severity="info" sx={{ mt: 3 }}>
          No vehicles found matching your search/filter criteria.
        </Alert>
      ) : filteredVehicles.length === 0 ? (
        <Alert severity="info" sx={{ mt: 3 }}>
          No vehicles available. Add one using the "Add New Vehicle" button!
        </Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>VIN</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Mileage</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.make}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.vin}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>{vehicle.mileage}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      component={Link}
                      to={`/vehicles/${vehicle.id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ ml: 1 }}
                      component={Link}
                      to={`/quotes/${vehicle.id}`}
                    >
                      Get Quotes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Dashboard;

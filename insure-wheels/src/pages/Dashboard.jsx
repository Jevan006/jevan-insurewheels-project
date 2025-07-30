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
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const { showSnackbar } = useSnackbar();

  // MOCKAPI.IO URL
  const API_URL = 'https://688927204c55d5c73951bb57.mockapi.io/vehicles';

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(API_URL);
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
        setVehicles(data);
      } catch (error) {
        setError(error.message);
        showSnackbar(`Error loading vehicles: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [API_URL, showSnackbar]);

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
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
        showSnackbar('Vehicle deleted successfully!', 'success');
      } catch (error) {
        setError(error.message);
        showSnackbar(`Failed to delete vehicle: ${error.message}`, 'error');
        console.error(`Failed to delete vehicle: ${error.message}`);
      }
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (!vehicle || !vehicle.make || !vehicle.model || !vehicle.year) {
      return false;
    }

    const matchesSearch = searchTerm === '' ||
                          vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = filterYear === '' ||
                        String(vehicle.year) === String(filterYear);

    return matchesSearch && matchesYear;
  });

  if (loading) {
    return (
      <Container
        component={Paper}
        elevation={3}
        maxWidth="lg"
        sx={{ p: 4, width: '100%', boxSizing: 'border-box', textAlign: 'center' }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading vehicles...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        component={Paper}
        elevation={3}
        maxWidth="lg"
        sx={{ p: 4, width: '100%', boxSizing: 'border-box' }}
      >
        <Alert severity="error">Error loading vehicles: {error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
            Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container
      component={Paper}
      elevation={3}
      maxWidth="lg"
      sx={{
        p: 4,
        boxSizing: 'border-box',
        mt: 4,
        mb: 4,
        ml: 'auto',
        mr: 'auto',
        // width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Vehicle Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/vehicles/new"
        >
          Add New Vehicle
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search by Make/Model"
          variant="outlined"
          sx={{ flexGrow: 1 }}
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
          type="number"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          sx={{ width: { xs: '100%', sm: '200px' } }}
        />
      </Box>

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

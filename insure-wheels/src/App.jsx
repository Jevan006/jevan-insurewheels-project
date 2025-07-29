import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import Routes, Route, and Link

// Import your page components
import Dashboard from './pages/Dashboard';
import NewVehicle from './pages/NewVehicle';
import EditVehicle from './pages/EditVehicle';
import Quotes from './pages/Quotes';
import ConfirmQuote from './pages/ConfirmQuote';

// Optional: Keep App.css if you still have global styles, otherwise remove.
// import './App.css';

function App() {
  return (
    <div>
      {/* A simple navigation bar (for testing) */}
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/vehicles/new">Add New Vehicle</Link></li>
          {/* Examples for dynamic routes - these links won't work perfectly until you have actual IDs */}
          <li><Link to="/vehicles/123/edit">Edit Vehicle (ID 123)</Link></li>
          <li><Link to="/quotes/456">Quotes (Vehicle 456)</Link></li>
          <li><Link to="/confirm">Confirm Quote</Link></li>
        </ul>
      </nav>

      {/* Define your routes here */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles/new" element={<NewVehicle />} />
        {/* The :id and :vehicleId are route parameters */}
        <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
        <Route path="/quotes/:vehicleId" element={<Quotes />} />
        <Route path="/confirm" element={<ConfirmQuote />} />

        {/* Optional: A default route for the home page or a redirect */}
        <Route path="/" element={<Dashboard />} /> {/* Redirects root to Dashboard */}
      </Routes>
    </div>
  );
}

export default App;

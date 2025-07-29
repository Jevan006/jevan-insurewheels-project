import React from 'react';
import { useParams } from 'react-router-dom'; // To get the vehicleId from the URL

function Quotes() {
  const { vehicleId } = useParams(); // Get the vehicle ID from the URL
  return (
    <div>
      <h2>Quotes Page</h2>
      <p>Showing 3 insurance quotes for vehicle ID: {vehicleId}</p>
    </div>
  );
}

export default Quotes;

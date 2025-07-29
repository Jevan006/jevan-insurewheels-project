import React from 'react';
import { useParams } from 'react-router-dom'; // To get the ID from the URL

function EditVehicle() {
  const { id } = useParams(); // Get the vehicle ID from the URL
  return (
    <div>
      <h2>Edit Vehicle Page</h2>
      <p>Editing vehicle with ID: {id}</p>
    </div>
  );
}

export default EditVehicle;

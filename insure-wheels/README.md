# Jevan Peters

# InsureWheels: Vehicle Insurance Quoting App

## Project Description

InsureWheels is a modern web application designed to streamline the process of managing vehicle information and obtaining insurance quotes. I I built it with React and Material-UI, as it provides a clean, responsive, and intuitive user interface for users to add, view, and modify their vehicles, get instant simulated insurance quotes, and proceed with policy confirmation. The application leverages a mock API for data management, making it easy to set up and demonstrate locally.

## Features

- **User Authentication:** Secure login and logout functionality to protect user data.
- **Dashboard:** A centralized view to display all registered vehicles.
- **Vehicle Management:**
  - **Add New Vehicle:** Easily input details for new vehicles.
  - **Edit Existing Vehicle:** Update vehicle information as needed.
- **Dynamic Insurance Quotes:**
  - View simulated insurance quotes for specific vehicles.
  - Quotes are generated dynamically based on vehicle details.
- **Quote Confirmation:** Select and "confirm" a preferred insurance quote.
- **Responsive Design:** Optimized layout for various screen sizes (desktop, tablet, mobile) using Material-UI's Grid system.
- **User Feedback:** Integrated Snackbar notifications for actions and errors.
- **Global State Management:** Utilizes React Context API for managing authentication state and Snackbar notifications.
- **Mock API Integration:** Uses a mock API (MockAPI.io) for vehicle data, simplifying local development without requiring a full backend setup.

## Technologies Used

- **Frontend:**
  - React (with Vite)
  - Material-UI (MUI) v5+
  - React Router DOM
  - Context API (for state management)
- **Styling:**
  - Material-UI's `sx` prop
  - Custom global CSS (`style.css`)
- **API:**
  - MockAPI.io (for vehicle data)
  - Local JavaScript simulation (for quotes)

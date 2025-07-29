import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Define your custom theme
let theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // A shade of blue for primary actions (e.g., buttons)
    },
    secondary: {
      main: "#ff9800", // A shade of orange for secondary actions or accents
    },
    error: {
      main: "#f44336", // Standard red for errors
    },
    warning: {
      main: "#ffc107", // Yellow for warnings
    },
    info: {
      main: "#2196f3", // Blue for informational messages
    },
    success: {
      main: "#4caf50", // Green for success messages
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Use Roboto (MUI's default) or your preferred font
    h4: {
      fontWeight: 600, // Make main titles a bit bolder
    },
    h5: {
      fontWeight: 500,
    },
  },
  // You can add more customizations here for components, spacing, etc.
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly more rounded buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded cards
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined", // Make all TextFields outlined by default
      },
    },
  },
});

// Make font sizes responsive
theme = responsiveFontSizes(theme);

export default theme;

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#48ad4d',  // Main green color
      light: '#6fcf70', // Lighter green for hover effects
      dark: '#2c682f',  // Darker green for accents
    },
    secondary: {
      main: '#FF4081',  // You can keep this or adjust as needed
      light: '#FF80AB',
      dark: '#F50057',
    },
    background: {
      default: '#f5f9f5',  // Very light mint/sage
      paper: '#ffffff',    // White for paper elements
    },
    text: {
      primary: '#333333',  // Dark gray for primary text
      secondary: '#757575', // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 500,
      letterSpacing: 0.5,
      fontSize: '1.25rem',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',  // Header color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
      },
    },
  },
});
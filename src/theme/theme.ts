import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#48ad4d',  // Mint/sage green
      light: '#2bdb09',  // Bright green for hover
      dark: '#3d9241',   // Darker mint/sage
    },
    secondary: {
      main: '#FF4081',
      light: '#FF80AB',
      dark: '#F50057',
    },
    background: {
      default: '#f5f9f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
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
          backgroundColor: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
        outlined: {
          color: '#000000',
          '& .MuiSvgIcon-root': {
            color: '#000000'
          }
        },
        contained: {
          color: '#ffffff',
          '& .MuiSvgIcon-root': {
            color: '#ffffff'
          }
        }
      },
    },
  },
});
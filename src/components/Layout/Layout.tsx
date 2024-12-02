import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Stack } from '@mui/material';
import logo from '../../assets/logo3.png';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  console.log('Layout component rendering');
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'  // Make sure the page takes at least full viewport height
      }}
    >
      <AppBar position="static" sx={{ 
        height: { 
          xs: '150px',  // smaller height on mobile
          sm: '180px',  // medium height on tablet
          md: '210px'   // original height on desktop
        } 
      }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={2}
          >
            <Box
              component="img"
              src={logo} 
              alt="Company Logo" 
              sx={{
                height: 'auto',
                width: 'auto',
                maxHeight: {
                  xs: '140px',  // smaller logo on mobile
                  sm: '150px',  // medium logo on tablet
                  md: '200px'   // original size on desktop
                },
                padding: {
                  xs: '3px',    // less padding on mobile
                  sm: '4px',
                  md: '5px'
                }
              }}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      
      {/* Main content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 4, 
          mb: 4,
          flex: 1  // This will push the footer to the bottom
        }}
      >
        {children}
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
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
      <AppBar position="static" sx={{ height: '210px' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={2}
          >
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '56px 16px 16px 16px',
                }}
            ></Box>
            <img 
              src={logo} 
              alt="Company Logo" 
              style={{
                height: '200px',
                width: 'auto',
                marginRight: '16px',
                padding: '5px',
              }}
            />
            <Stack alignItems="center">
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  fontSize: '1.25rem',
                }}
              >
                
              </Typography>
            </Stack>
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
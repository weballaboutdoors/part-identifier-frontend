import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#000000',
        minHeight: '150px'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 4
          }}
        >
          {/* First Column */}
          <Box sx={{ minWidth: '250px' }}>
            <Link 
              href="https://www.allaboutdoors.com" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ 
                color: '#FFFFFF', 
                textDecoration: 'none',
                '&:hover': {
                  color: '#2bdb09'  // Green color on hover
                }
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                All About Doors & Windows
              </Typography>
            </Link>
            <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 1 }}>
              110 E 16th Ave
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 1 }}>
              N. Kansas City, MO 64116
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
              Phone: (816) 221-6543
            </Typography>
          </Box>

          {/* Middle Column */}
          <Box sx={{ minWidth: '200px' }}>
            <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
              Hours & Contact
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 1 }}>
              Hours: Mon-Fri 8AM-4PM CST
            </Typography>
            <Link 
              href="https://www.allaboutdoors.com" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ 
                color: '#FFFFFF', 
                textDecoration: 'none',
                '&:hover': {
                  color: '#2bdb09'  // Green color on hover
                }
              }}
            >
              Website: allaboutdoors.com
            </Link>
          </Box>

          {/* Last Column */}
          <Box sx={{ minWidth: '200px' }}>
            <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
              Legal
            </Typography>
            <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 1 }}>
              © {new Date().getFullYear()} AADW
            </Typography>
            <Box>
              <Link 
                href="/privacy-policy" 
                sx={{ 
                  color: '#FFFFFF', 
                  mr: 2, 
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#2bdb09'  // Green color on hover
                  }
                }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                sx={{ 
                  color: '#FFFFFF', 
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#2bdb09'  // Green color on hover
                  }
                }}
              >
                Terms of Service
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
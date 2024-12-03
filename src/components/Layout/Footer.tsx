import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

const Footer: React.FC = () => {
    return (
      <Box
        component="footer"
        sx={{
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2 },
          mt: 'auto',
          backgroundColor: '#000000',  // Changed to black
          minHeight: { xs: '100px', sm: '150px' }
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: { xs: 2, sm: 4 },
              textAlign: { xs: 'left', sm: 'left' }
            }}
          >
            {/* First Column */}
            <Box sx={{ 
              minWidth: { xs: '200px', sm: '250px' },
              width: { xs: '100%', sm: 'auto' }
            }}>
              <Link 
                href="https://www.allaboutdoors.com" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#f5f9f5',  // Changed to mint/sage
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#2bdb09'
                  },
                  display: 'block',
                  mb: 1
                }}
              >
                <Typography variant="h6">
                  All About Doors & Windows
                </Typography>
              </Link>
              <Typography variant="body2" sx={{ color: '#f5f9f5', mb: 1 }}>
                110 E 16th Ave
              </Typography>
              <Typography variant="body2" sx={{ color: '#f5f9f5', mb: 1 }}>
                N. Kansas City, MO 64116
              </Typography>
            </Box>
  
            {/* Middle Column */}
            <Box sx={{ 
              minWidth: { xs: '200px', sm: '200px' },
              width: { xs: '100%', sm: 'auto' }
            }}>
              <Typography variant="h6" sx={{ color: '#f5f9f5', mb: 1 }}>
                Hours & Contact
              </Typography>
              <Typography variant="body2" sx={{ color: '#f5f9f5', mb: 1 }}>
                Hours: Mon-Fri 8AM-4PM CST
              </Typography>
              <Link 
                href="tel:+18162216543" 
                sx={{ 
                  textDecoration: 'none',
                  color: '#f5f9f5',
                  '&:hover': {
                    color: '#2bdb09'
                  },
                  display: 'block',
                  mb: 1
                }}
              >
                <Typography variant="body2">
                  Phone: (816) 221-6543
                </Typography>
              </Link>
              <Link 
                href="https://www.allaboutdoors.com" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#f5f9f5',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#2bdb09'
                  },
                  display: 'block'
                }}
              >
                <Typography variant="body2">
                  allaboutdoors.com
                </Typography>
              </Link>
            </Box>
  
            {/* Last Column */}
            <Box sx={{ 
              minWidth: { xs: '200px', sm: '200px' },
              width: { xs: '100%', sm: 'auto' }
            }}>
              <Typography variant="h6" sx={{ color: '#f5f9f5', mb: 1 }}>
                Legal
              </Typography>
              <Typography variant="body2" sx={{ color: '#f5f9f5', mb: 1 }}>
                © {new Date().getFullYear()} AADW
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 1
              }}>
                <MuiLink 
                  component={RouterLink}
                  to="/privacy-policy" 
                  sx={{ 
                    color: '#f5f9f5',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#2bdb09'
                    }
                  }}
                >
                  <Typography variant="body2">
                    Privacy Policy
                  </Typography>
                </MuiLink>
                <MuiLink 
                  component={RouterLink}
                  to="/terms-of-service" 
                  sx={{ 
                    color: '#f5f9f5',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#2bdb09'
                    }
                  }}
                >
                  <Typography variant="body2">
                    Terms of Service
                  </Typography>
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default Footer;
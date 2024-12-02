import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <Container maxWidth="md">
        <Box sx={{ 
        mt: { xs: 1, sm: 2 },
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'flex-start' }
      }}>
        <Button 
          component={Link} 
          to="/"
          sx={{ 
            minWidth: 0,  // Allows the button to be more compact
            p: { xs: 1, sm: 1.5 }
          }}
        >
          <HomeIcon sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }} />
        </Button>
      </Box>
        <Paper elevation={15} sx={{ 
          p: { xs: 2, sm: 3, md: 4 }, 
          mt: { xs: 1, sm: 2 },
          mx: { xs: -2, sm: 0 }
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
            }}
          >
            Privacy Policy
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
  
          <Typography 
            variant="body1" 
            paragraph
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            At All About Doors & Windows, we value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our Part Identification service.
          </Typography>
  
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              mt: { xs: 2, sm: 4 },
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            1. Information We Collect
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            We collect the following types of information:
          </Typography>
          <Typography 
            component="div" 
            sx={{ 
              pl: { xs: 1, sm: 2 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            • Images and photos you upload for part identification<br/>
            • Device information (browser type, operating system, device type)<br/>
            • Usage data (how you interact with our service)<br/>
            • IP address and location data<br/>
            • Cookies and similar tracking technologies
          </Typography>
  
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              mt: { xs: 2, sm: 4 },
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            2. How We Use Your Information
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            We use your information for:
          </Typography>
          <Typography 
            component="div" 
            sx={{ 
              pl: { xs: 1, sm: 2 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            • Providing and improving our part identification services<br/>
            • Enhancing accuracy through machine learning<br/>
            • Analyzing usage patterns to improve user experience<br/>
            • Communicating service updates and changes<br/>
            • Preventing fraud and ensuring security
          </Typography>
  
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              mt: { xs: 2, sm: 4 },
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            3. Data Storage and Security
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            We implement appropriate security measures to protect your data. Your information is stored securely and retained only for as long as necessary to provide our services or comply with legal obligations.
          </Typography>
  
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              mt: { xs: 2, sm: 4 },
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            4. Your Rights
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            You have the right to:
          </Typography>
          <Typography 
            component="div" 
            sx={{ 
              pl: { xs: 1, sm: 2 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            • Access your personal data<br/>
            • Request correction of your data<br/>
            • Request deletion of your data<br/>
            • Object to processing of your data<br/>
            • Data portability
          </Typography>
  
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              mt: { xs: 2, sm: 4 },
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            5. Cookies
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            We use cookies to enhance your experience. You can control cookie settings through your browser preferences.
          </Typography>
  
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              mt: { xs: 2, sm: 4 },
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            6. Contact Us
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            For any privacy-related questions or concerns, please contact us at (816) 221-6543
          </Typography>
        </Paper>
      </Container>
    );
};

export default PrivacyPolicy;
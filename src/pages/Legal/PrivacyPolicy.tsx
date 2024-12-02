import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 2 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Box>
        <Paper elevation={15} sx={{ p: 4, mt: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Privacy Policy
          </Typography>
          
          <Typography variant="body1" paragraph>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
  
          <Typography variant="body1" paragraph>
            At All About Doors & Windows, we value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our Part Identification service.
          </Typography>
  
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            1. Information We Collect
          </Typography>
          
          <Typography variant="body1" paragraph>
            We collect the following types of information:
          </Typography>
          <Typography component="div" sx={{ pl: 2 }}>
            • Images and photos you upload for part identification<br/>
            • Device information (browser type, operating system, device type)<br/>
            • Usage data (how you interact with our service)<br/>
            • IP address and location data<br/>
            • Cookies and similar tracking technologies
          </Typography>
  
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            2. How We Use Your Information
          </Typography>
          
          <Typography variant="body1" paragraph>
            We use your information for:
          </Typography>
          <Typography component="div" sx={{ pl: 2 }}>
            • Providing and improving our part identification services<br/>
            • Enhancing accuracy through machine learning<br/>
            • Analyzing usage patterns to improve user experience<br/>
            • Communicating service updates and changes<br/>
            • Preventing fraud and ensuring security
          </Typography>
  
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            3. Data Storage and Security
          </Typography>
          
          <Typography variant="body1" paragraph>
            We implement appropriate security measures to protect your data. Your information is stored securely and retained only for as long as necessary to provide our services or comply with legal obligations.
          </Typography>
  
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            4. Your Rights
          </Typography>
          
          <Typography variant="body1" paragraph>
            You have the right to:
          </Typography>
          <Typography component="div" sx={{ pl: 2 }}>
            • Access your personal data<br/>
            • Request correction of your data<br/>
            • Request deletion of your data<br/>
            • Object to processing of your data<br/>
            • Data portability
          </Typography>
  
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            5. Cookies
          </Typography>
          
          <Typography variant="body1" paragraph>
            We use cookies to enhance your experience. You can control cookie settings through your browser preferences.
          </Typography>
  
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            6. Contact Us
          </Typography>
          
          <Typography variant="body1" paragraph>
            For any privacy-related questions or concerns, please contact us at (816) 221-6543
          </Typography>
        </Paper>
      </Container>
    );
  };

export default PrivacyPolicy;
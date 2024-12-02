import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
          Terms of Service
        </Typography>
        
        <Typography variant="body1" paragraph>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography variant="body1" paragraph>
          Please read these Terms of Service carefully before using our Part Identification service.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          1. Acceptance of Terms
        </Typography>
        
        <Typography variant="body1" paragraph>
          By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of these terms, you may not access the service.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          2. Service Description
        </Typography>
        
        <Typography variant="body1" paragraph>
          Our Part Identification service uses artificial intelligence to identify and analyze parts through uploaded images. While we strive for accuracy, results are provided "as is" without any guarantees of complete accuracy. If you need assistance with a part, please contact our customer service  team at (816) 221-6543.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          3. User Responsibilities
        </Typography>
        
        <Typography variant="body1" paragraph>
          Users must:
        </Typography>
        <Typography component="div" sx={{ pl: 2 }}>
          • Provide accurate and lawful information<br/>
          • Maintain the security of their account<br/>
          • Not misuse or attempt to manipulate the service<br/>
          • Not upload harmful or malicious content<br/>
          • Comply with all applicable laws and regulations
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          4. Intellectual Property
        </Typography>
        
        <Typography variant="body1" paragraph>
          All content, features, and functionality of our service are owned by us and protected by international copyright, trademark, and other intellectual property laws.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          5. Limitation of Liability
        </Typography>
        
        <Typography variant="body1" paragraph>
          We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          6. Changes to Terms
        </Typography>
        
        <Typography variant="body1" paragraph>
          We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          7. Termination
        </Typography>
        
        <Typography variant="body1" paragraph>
          We may terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or us.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          8. Contact Information
        </Typography>
        
        <Typography variant="body1" paragraph>
          For any questions about these Terms, please contact us at (816) 221-6543
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
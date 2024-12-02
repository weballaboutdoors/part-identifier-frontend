import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" paragraph>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography variant="body1" paragraph>
          We take your privacy seriously. This policy describes what personal information we collect and how we use it.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Information We Collect
        </Typography>
        
        <Typography variant="body1" paragraph>
          When you use our Part Identification service, we may collect:
          • Images you upload
          • Device information
          • Usage data
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          How We Use Your Information
        </Typography>
        
        <Typography variant="body1" paragraph>
          We use the collected information to:
          • Provide part identification services
          • Improve our identification accuracy
          • Enhance user experience
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
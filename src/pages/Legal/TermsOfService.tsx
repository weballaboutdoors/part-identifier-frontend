import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const TermsOfService: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms of Service
        </Typography>
        
        <Typography variant="body1" paragraph>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography variant="body1" paragraph>
          By using our Part Identification service, you agree to these terms.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Service Usage
        </Typography>
        
        <Typography variant="body1" paragraph>
          Our part identification service is provided "as is." While we strive for accuracy, we cannot guarantee 100% correct identifications.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          User Responsibilities
        </Typography>
        
        <Typography variant="body1" paragraph>
          Users are responsible for:
          • Providing accurate information
          • Maintaining account security
          • Complying with all applicable laws
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
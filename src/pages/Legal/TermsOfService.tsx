import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const TermsOfService: React.FC = () => {
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
            minWidth: 0,
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
          Terms of Service
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
          Please read these Terms of Service carefully before using our Part Identification service.
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          1. Acceptance of Terms
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of these terms, you may not access the service.
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          2. Service Description
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Our Part Identification service uses artificial intelligence to identify and analyze parts through uploaded images. While we strive for accuracy, results are provided "as is" without any guarantees of complete accuracy. If you need assistance with a part, please contact our customer service team at (816) 221-6543.
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          3. User Responsibilities
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Users must:
        </Typography>
        <Typography 
          component="div" 
          sx={{ 
            pl: { xs: 1, sm: 2 },
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          • Provide accurate and lawful information<br/>
          • Maintain the security of their account<br/>
          • Not misuse or attempt to manipulate the service<br/>
          • Not upload harmful or malicious content<br/>
          • Comply with all applicable laws and regulations
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          4. Intellectual Property
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          All content, features, and functionality of our service are owned by us and protected by international copyright, trademark, and other intellectual property laws.
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          5. Limitation of Liability
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          6. Changes to Terms
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service.
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          7. Termination
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          We may terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or us.
        </Typography>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          8. Contact Information
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          For any questions about these Terms, please contact us at (816) 221-6543
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
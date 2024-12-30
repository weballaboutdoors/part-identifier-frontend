import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Divider
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

interface NoResultsCardProps {
  searchQuery?: string;
}

const NoResultsCard: React.FC<NoResultsCardProps> = ({ searchQuery }) => {
  const handlePhoneClick = () => {
    window.location.href = 'tel:1-800-123-4567';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@example.com';
  };

  const handleChatClick = () => {
    // Implement your chat functionality here
    console.log('Opening chat...');
  };

  return (
    <Card sx={{ 
      maxWidth: 600, 
      mx: 'auto', 
      mt: 3,
      boxShadow: 3,
      border: '1px solid #e0e0e0'
    }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#285c2a' }}>
          No Matches Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          We couldn't find an exact match for your search
          {searchQuery && ` "${searchQuery}"`}. Our customer service team is here to help!
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom sx={{ color: '#285c2a' }}>
          Contact Us
        </Typography>

        <Stack spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<PhoneIcon />}
            onClick={handlePhoneClick}
            sx={{
              borderColor: '#285c2a',
              color: '#285c2a',
              '&:hover': {
                borderColor: '#48ad4d',
                backgroundColor: 'rgba(72, 173, 77, 0.04)'
              }
            }}
          >
            Call Us: 1-800-123-4567
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<EmailIcon />}
            onClick={handleEmailClick}
            sx={{
              borderColor: '#285c2a',
              color: '#285c2a',
              '&:hover': {
                borderColor: '#48ad4d',
                backgroundColor: 'rgba(72, 173, 77, 0.04)'
              }
            }}
          >
            Email Support
          </Button>

          <Button
            fullWidth
            variant="contained"
            startIcon={<ChatIcon />}
            onClick={handleChatClick}
            sx={{
              backgroundColor: '#48ad4d',
              '&:hover': {
                backgroundColor: '#3d9341'
              }
            }}
          >
            Start Live Chat
          </Button>
        </Stack>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Available Monday-Friday: 8am-5pm CST
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoResultsCard;
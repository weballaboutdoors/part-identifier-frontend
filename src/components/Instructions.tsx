import React from 'react';
import { Paper, List, ListItem, ListItemIcon, ListItemText, Typography, Link } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const Instructions: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ 
      p: { xs: 2, sm: 3 }, 
      height: '100%',
      '& .MuiListItemText-primary': {
        fontSize: { xs: '0.9rem', sm: '1rem' },
        textAlign: 'left',
        fontWeight: 500,
        color: '#000000',
      },
      '& .MuiListItemText-secondary': {
        fontSize: { xs: '0.8rem', sm: '0.875rem' },
        textAlign: 'left',
        color: '#000000',
      }
    }}>
      <Typography 
        variant="h6" 
        color="#000000" 
        gutterBottom
        sx={{ 
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          textAlign: { xs: 'center', sm: 'left' },
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'primary.main',
          mb: 2
        }}
      >
        How to Take the Best Photo
      </Typography>
      <List sx={{ py: 0 }}>
        <ListItem 
          sx={{ 
            px: { xs: 1, sm: 2 },
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: { xs: 36, sm: 40 },
            mt: 0.5
          }}>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Lighting & Background"
            secondary="Place the part in a well-lit area with minimal shadows. Use a plain, light-colored background for best results."
          />
        </ListItem>
        <ListItem 
          sx={{ 
            px: { xs: 1, sm: 2 },
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: { xs: 36, sm: 40 },
            mt: 0.5
          }}>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Part Numbers & Markings"
            secondary="Ensure any part numbers, labels, or identifying markings are clearly visible in the photo."
          />
        </ListItem>
        <ListItem 
          sx={{ 
            px: { xs: 1, sm: 2 },
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: { xs: 36, sm: 40 },
            mt: 0.5
          }}>
            <CheckCircle color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Single Part Focus"
            secondary="Photograph one part at a time, keeping the entire part in frame and in focus."
          />
        </ListItem>
      </List>
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 2,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          color: '#000000'
        }}
      >
        Need help? Visit our{' '}
        <Link 
          href="https://www.allaboutdoors.com/contact-us" 
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#285c2a',
            textDecoration: 'underline',
            '&:hover': {
              color: '#48ad4d',
              textDecoration: 'underline'
            }
          }}
        >
          support page
        </Link>
        {' '}for additional assistance.
      </Typography>
    </Paper>
  );
};

export default Instructions;
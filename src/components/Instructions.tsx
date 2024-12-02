import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Grid, Link } from '@mui/material';
import { PhotoCamera, Search, CheckCircle, Warning } from '@mui/icons-material';

const Instructions: React.FC = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 2 }}>
      {/* All Three Boxes in One Row */}
      <Grid item xs={12} md={4}>
        <Paper elevation={15} sx={{ p: 3, height: '92%' }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Best Practices
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Good Lighting"
                secondary="Well-lit with minimal shadows"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Clear Background"
                secondary="Use plain, light background"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Part Numbers"
                secondary="Keep markings visible & clear"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={15} sx={{ p: 3, height: '92%' }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Simple Steps
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <PhotoCamera color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="1. Take Photo"
                secondary="Upload clear image of part"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Search color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="2. Review Results"
                secondary="Check suggested matches"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="3. Confirm Match"
                secondary="Select correct part"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={15} sx={{ p: 3, height: '92%' }}>
          <Typography variant="h6" color="error" gutterBottom>
            Common Issues
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Poor Quality"
                secondary="Avoid blurry/dark images"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Multiple Parts"
                secondary="One part per image only"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Hidden Numbers"
                secondary="Keep part numbers visible"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      {/* Optional Help Text */}
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="subtitle2" color="text.primary">
            Need Help? Try taking multiple photos from different angles or{' '}
            <Link
              href="tel:+18162216543"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'primary.dark'
                }
              }}
            >
              contact support
            </Link>
            .
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Instructions;
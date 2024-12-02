import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Grid, Link } from '@mui/material';
import { PhotoCamera, Search, CheckCircle, Warning } from '@mui/icons-material';

const Instructions: React.FC = () => {
  return (
    <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 2 }}>
      {/* All Three Boxes in One Row */}
      <Grid item xs={12} md={4}>
        <Paper elevation={15} sx={{ 
          p: { xs: 2, sm: 3 }, 
          height: '100%',
          '& .MuiListItemText-primary': {
            fontSize: { xs: '0.9rem', sm: '1rem' },
            textAlign: { xs: 'center', sm: 'left' }
          },
          '& .MuiListItemText-secondary': {
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }
        }}>
          <Typography 
            variant="h6" 
            color="primary" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              textAlign: { xs: 'center', sm: 'center' },
              pb: 1,  // Add padding bottom
              borderBottom: '1px solid',  // Add border
              borderColor: 'primary.main',  // Match the text color
              mb: 2  // Add margin bottom
            }}
          >
            Best Practices
          </Typography>
          <List sx={{ py: 0 }}>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Good Lighting"
                secondary="Well-lit with minimal shadows"
              />
            </ListItem>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Clear Background"
                secondary="Use plain, light background"
              />
            </ListItem>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
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
        <Paper elevation={15} sx={{ 
          p: { xs: 2, sm: 3 }, 
          height: '100%',
          '& .MuiListItemText-primary': {
            fontSize: { xs: '0.9rem', sm: '1rem' },
            textAlign: { xs: 'center', sm: 'left' }
          },
          '& .MuiListItemText-secondary': {
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }
        }}>
          <Typography 
            variant="h6" 
            color="primary" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              textAlign: { xs: 'center', sm: 'center' },
              pb: 1,  // Add padding bottom
              borderBottom: '1px solid',  // Add border
              borderColor: 'primary.main',  // Match the text color
              mb: 2  // Add margin bottom
            }}
          >
            Simple Steps
          </Typography>
          <List sx={{ py: 0 }}>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
                <PhotoCamera color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="1. Take Photo"
                secondary="Upload clear image of part"
              />
            </ListItem>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
                <Search color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="2. Review Results"
                secondary="Check suggested matches"
              />
            </ListItem>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
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
        <Paper elevation={15} sx={{ 
          p: { xs: 2, sm: 3 }, 
          height: '100%',
          '& .MuiListItemText-primary': {
            fontSize: { xs: '0.9rem', sm: '1rem' },
            textAlign: { xs: 'center', sm: 'left' }
          },
          '& .MuiListItemText-secondary': {
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }
        }}>
          <Typography 
            variant="h6" 
            color="error" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              textAlign: { xs: 'center', sm: 'center' },
              pb: 1,  // Add padding bottom
              borderBottom: '1px solid',  // Add border
              borderColor: 'primary.main',  // Match the text color
              mb: 2  // Add margin bottom
            }}
          >
            Common Issues
          </Typography>
          <List sx={{ py: 0 }}>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Poor Quality"
                secondary="Avoid blurry/dark images"
              />
            </ListItem>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Multiple Parts"
                secondary="One part per image only"
              />
            </ListItem>
            <ListItem 
              sx={{ 
                px: { xs: 1, sm: 2 },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1, sm: 0 }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: { xs: 'auto', sm: 40 },
                mb: { xs: 0.5, sm: 0 }
              }}>
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
        <Box sx={{ 
          textAlign: 'center', 
          mt: { xs: 0.5, sm: 1 },
          px: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant="subtitle2" 
            color="text.primary"
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
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
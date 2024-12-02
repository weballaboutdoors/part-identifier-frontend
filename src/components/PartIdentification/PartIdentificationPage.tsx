import React, { useState } from 'react';
import { Box, Paper, Stepper, Step, StepLabel, Typography, Button, Stack, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import CameraCapture from './CameraCapture';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';
import Instructions from '../../components/Instructions';
import { identifyPart } from '../../services/api';
import { Refresh as RefreshIcon, Search as SearchIcon } from '@mui/icons-material';
const steps = ['Capture/Upload', 'Review Image', 'View Results'];

const PartIdentificationPage: React.FC = () => {
  console.log('PartIdentificationPage rendering');
  const [activeStep, setActiveStep] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [identificationResult, setIdentificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageCapture = (image: string) => {
    setCapturedImage(image);
    setActiveStep(1);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCapturedImage(base64String);
      setActiveStep(1);
    };
    reader.readAsDataURL(file);
  };

  const handleIdentification = async (image: string) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
      
      const result = await identifyPart(file);
      setIdentificationResult(result);
      setActiveStep(2);
      setError(null);
    } catch (error) {
      console.error('Error identifying part:', error);
      setError('Failed to identify part. Please try again.');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>

      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" align="center" color="text.primary">
          If you have any concerns using this service, please review our{' '}
          <MuiLink component={Link} to="/terms-of-service">Terms of Service</MuiLink>{' '}
          and{' '}
          <MuiLink component={Link} to="/privacy-policy">Privacy Policy</MuiLink>.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {activeStep === 0 && (
          <Stack 
            spacing={2} 
            alignItems="center"
            sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}
          >
            <CameraCapture onCapture={handleImageCapture} />
            <ImageUpload onImageSelect={handleImageUpload} />
          </Stack>
        )}

        {activeStep === 1 && capturedImage && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 3,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <Typography variant="h6" color="text.secondary">
              Review Your Image
            </Typography>

            <Paper 
              elevation={15} 
              sx={{ 
                p: 2, 
                width: '100%',
                backgroundColor: '#f8f8f8',
                borderRadius: 2
              }}
            >
              <img 
                src={capturedImage} 
                alt="Captured part" 
                style={{ 
                  width: '100%',
                  height: 'auto',
                  borderRadius: '4px',
                  display: 'block'
                }} 
              />
            </Paper>

            <Typography variant="body2" color="text.secondary">
              Please ensure the image is clear and well-lit before proceeding
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              justifyContent: 'center'
            }}>
              <Button 
                variant="outlined"
                color="primary"
                onClick={() => setActiveStep(0)}
                startIcon={<RefreshIcon />}
              >
                Retake Photo
              </Button>
              
              <Button 
                variant="contained" 
                onClick={() => handleIdentification(capturedImage)}
                startIcon={<SearchIcon />}
                sx={{ minWidth: '150px' }}
              >
                Identify Part
              </Button>
            </Box>
          </Box>
        )}
        {activeStep === 2 && identificationResult && (
          <ResultDisplay 
            identificationResult={identificationResult} 
            onRetry={() => setActiveStep(0)} 
          />
        )}
      </Paper>

      {/* Instructions at the bottom */}
      <Box sx={{ mt: 4 }}>
        <Instructions />
      </Box>
    </Box>
  );
};

export default PartIdentificationPage;
import React, { useState } from 'react';
import { Box, Paper, Stepper, Step, StepLabel, Typography, Button, Stack } from '@mui/material';
import CameraCapture from './CameraCapture';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';
import Instructions from '../../components/Instructions';
import { identifyPart } from '../../services/api';

const steps = ['Take/Upload', 'Review Image', 'View Results'];

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
          <Box sx={{ textAlign: 'center' }}>
            <img src={capturedImage} alt="Captured part" style={{ maxWidth: '100%', maxHeight: '400px' }} />
            <Button 
              variant="contained" 
              onClick={() => handleIdentification(capturedImage)}
              sx={{ mt: 2 }}
            >
              Identify Part
            </Button>
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
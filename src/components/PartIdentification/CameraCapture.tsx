import React, { useRef, useState } from 'react';
import { Box, Button, CircularProgress, Paper } from '@mui/material';
import { CameraAlt, Cameraswitch } from '@mui/icons-material';
import Webcam from 'react-webcam';

interface CameraCaptureProps {
  onCapture: (image: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const videoConstraints = {
    facingMode: isFrontCamera ? 'user' : 'environment',
    width: 1280,
    height: 720,
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3, 
          width: '100%', 
          maxWidth: 640,
          position: 'relative' 
        }}
      >
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={{ width: '100%', height: 'auto' }}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={toggleCamera}
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <Cameraswitch />
        </Button>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <CameraAlt />}
        onClick={handleCapture}
        disabled={isLoading}
        sx={{ width: 200 }}
      >
        Capture Image
      </Button>
    </Box>
  );
};

export default CameraCapture;
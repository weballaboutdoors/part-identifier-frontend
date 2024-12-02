import React, { useRef, useState } from 'react';
import { Box, Button, CircularProgress, Paper } from '@mui/material';
import { CameraAlt, Cameraswitch, Upload as UploadIcon } from '@mui/icons-material';
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onCapture(base64String); // Using the same onCapture for uploaded images
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper 
        elevation={15} 
        sx={{ 
          width: '100%',
          maxWidth: '1024px',
          height: '576px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
          borderRadius: 2,
          mb: 3
        }}
      >
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
            width: 1920,          // Increased resolution
            height: 1080         // Increased resolution
          }}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={toggleCamera}
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16,
            minWidth: 'auto',
            borderRadius: '50%',
            p: 1
          }}
        >
          <Cameraswitch />
        </Button>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <CameraAlt />}
          onClick={handleCapture}
          disabled={isLoading}
          sx={{
            width: 190,
            height: 65,
            textTransform: 'none',
            fontSize: '1rem',
            flexDirection: 'column',
            '& .MuiButton-startIcon': {
              margin: 0,
              fontSize: '2rem',
              marginBottom: .25
            }
          }}
        >
          Capture
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<UploadIcon />}
          component="label"
          sx={{
            width: 190,
            height: 65,
            textTransform: 'none',
            fontSize: '1rem',
            flexDirection: 'column',
            '& .MuiButton-startIcon': {
              margin: 0,
              fontSize: '2rem',
              marginBottom: .25
            }
          }}
        >
          Upload
          <input type="file" accept="image/*" onChange={handleFileChange} hidden />
        </Button>
      </Box>
    </Box>
  );
};

export default CameraCapture;
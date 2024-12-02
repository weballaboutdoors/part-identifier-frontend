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
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      width: '100%'
    }}>
      <Paper 
        elevation={15} 
        sx={{ 
          width: '100%',
          maxWidth: {
            xs: '100%',    // Full width on mobile
            sm: '600px',   // Tablet
            md: '800px'    // Desktop
          },
          height: {
            xs: '300px',   // Smaller height on mobile
            sm: '400px',   // Tablet
            md: '450px'    // Desktop
          },
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
            width: 1920,
            height: 1080
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
            p: 1,
            width: {
              xs: '36px',  // Smaller on mobile
              sm: '48px'   // Larger on tablet/desktop
            },
            height: {
              xs: '36px',
              sm: '48px'
            }
          }}
        >
          <Cameraswitch />
        </Button>
      </Paper>

      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexDirection: {
          xs: 'column',  // Stack buttons vertically on mobile
          sm: 'row'      // Side by side on tablet/desktop
        }
      }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <CameraAlt />}
          onClick={handleCapture}
          disabled={isLoading}
          sx={{
            width: {
              xs: '160px',  // Smaller on mobile
              sm: '190px'   // Larger on tablet/desktop
            },
            height: {
              xs: '50px',   // Smaller on mobile
              sm: '65px'    // Larger on tablet/desktop
            },
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
            width: {
              xs: '160px',
              sm: '190px'
            },
            height: {
              xs: '50px',
              sm: '65px'
            },
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
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default CameraCapture;
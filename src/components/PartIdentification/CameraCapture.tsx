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
            xs: '100%',    
            sm: '600px',   
            md: '800px'    
          },
          height: {
            xs: '300px',   
            sm: '400px',   
            md: '450px'    
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
              xs: '36px',
              sm: '48px'
            },
            height: {
              xs: '36px',
              sm: '48px'
            },
            color: '#000000',
            '& .MuiSvgIcon-root': {
              color: '#000000',
              '&:hover': {
                color: '#000000'
              }
            }
          }}
        >
          <Cameraswitch />
        </Button>
      </Paper>

      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexDirection: 'row',  // Changed to always be row
        justifyContent: 'center'
      }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCapture}
          disabled={isLoading}
          sx={{
            width: {
              xs: '56px',     // Circle on mobile
              sm: '190px'     // Regular width on desktop
            },
            height: {
              xs: '56px',     // Circle on mobile
              sm: '65px'      // Regular height on desktop
            },
            borderRadius: {
              xs: '50%',      // Circle on mobile
              sm: '4px'       // Regular corners on desktop
            },
            minWidth: {
              xs: '56px',
              sm: '190px'
            },
            color: '#000000',
            '&:hover': {
              backgroundColor: '#42994b'
            },
            '& .MuiSvgIcon-root': {
              color: '#000000'
            },
            textTransform: 'none',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              <CameraAlt sx={{ 
                fontSize: {
                  xs: '1.8rem',
                  sm: '2rem'
                }
              }} />
              <Box 
                component="span"
                sx={{ 
                  display: { xs: 'none', sm: 'block' },
                  ml: { sm: 1 }
                }}
              >
                Capture
              </Box>
            </>
          )}
        </Button>

        <Button
          variant="contained"
          color="primary"
          component="label"
          sx={{
            width: {
              xs: '56px',     // Circle on mobile
              sm: '190px'     // Regular width on desktop
            },
            height: {
              xs: '56px',     // Circle on mobile
              sm: '65px'      // Regular height on desktop
            },
            borderRadius: {
              xs: '50%',      // Circle on mobile
              sm: '4px'       // Regular corners on desktop
            },
            minWidth: {
              xs: '56px',
              sm: '190px'
            },
            color: '#000000',  // Black text and icon
            '&:hover': {
              backgroundColor: '#42994b'  // Slightly darker white on hover
            },
            '& .MuiSvgIcon-root': {  // Ensures icon is also black
              color: '#000000'
            },
            textTransform: 'none',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <UploadIcon sx={{ 
            fontSize: {
              xs: '1.8rem',
              sm: '2rem'
            }
          }} />
          <Box 
            component="span"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              ml: { sm: 1 }
            }}
          >
            Upload
          </Box>
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
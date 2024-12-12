import React, { useState } from 'react';
import { Box, Paper, Stepper, Step, StepLabel, Typography, Button, Stack, Link as MuiLink, TextField, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import CameraCapture from './CameraCapture';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';
import Instructions from '../../components/Instructions';
import { identifyPart } from '../../services/api';
import { Refresh as RefreshIcon, Search as SearchIcon } from '@mui/icons-material';

const steps = ['Capture / Upload', 'Review Image', 'View Results'];

const PartIdentificationPage: React.FC = () => {
  console.log('PartIdentificationPage rendering');
  const [activeStep, setActiveStep] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [identificationResult, setIdentificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [capturedFilename, setCapturedFilename] = useState<string | null>(null);
  const [sku, setSku] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const handleImageCapture = (image: string) => {
    setCapturedImage(image);
    setActiveStep(1);
  };

  const handleImageUpload = (file: File) => {
    console.log('Starting file upload process', file.name);
    
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log('File converted to base64');
        setCapturedImage(base64String);
        setActiveStep(1);
    };

    reader.onerror = (error) => {
        console.error('Error reading file:', error);
        setError('Failed to read uploaded file');
    };

    try {
        reader.readAsDataURL(file);
    } catch (error) {
        console.error('Error starting file read:', error);
        setError('Failed to process uploaded file');
    }
  };

  const handleRetry = () => {
    setActiveStep(0);
    setSearchQuery('');
    setSku('');
    setColor('');
    setBrand('');
    setProductType('');
    setLocation('');
    setCapturedImage(null);
    setIdentificationResult(null);
    setError(null);
  };

  const handleIdentification = async (image: string) => {
    setIsLoading(true);
    setIsProcessingImage(true);
    setError(null);
    
    try {
        console.log('Starting identification process with image and text');
        
        const base64Response = await fetch(image);
        const blob = await base64Response.blob();
        const filename = `uploaded_image_${new Date().getTime()}.jpg`;
        const file = new File([blob], filename, { type: 'image/jpeg' });
        
        const formData = new FormData();
        formData.append('image', file);
        formData.append('min_confidence', '50.0');
        
        if (searchQuery.trim()) {
            formData.append('text_query', searchQuery.trim());
            console.log('Added text query to search:', searchQuery.trim());
        }

        const searchParams = {
            text_query: searchQuery.trim(),
            sku: sku.trim(),
            product_type: productType,
            color: color.trim(),
            location: location
        };

        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        setIsProcessingImage(false); // Switch to searching phase
        const result = await identifyPart(formData);
        console.log('Identification result:', result);
        
        setIdentificationResult(result);
        setActiveStep(2);
        
    } catch (error) {
        console.error('Error identifying part:', error);
        setError(error instanceof Error ? error.message : 'Failed to identify part');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#ffffff' }}>
        <Typography variant="body2" align="center" color="#000000">
          Before using this service, please review our{' '}
          <MuiLink 
            component={Link} 
            to="/terms-of-service"
            sx={{ 
              color: '#285c2a',
              '&:hover': {
                color: '#48ad4d'
              }
            }}
          >
            Terms of Service
          </MuiLink>{' '}
          and{' '}
          <MuiLink 
            component={Link} 
            to="/privacy-policy"
            sx={{ 
              color: '#285c2a',
              '&:hover': {
                color: '#48ad4d'
              }
            }}
          >
            Privacy Policy
          </MuiLink>.
        </Typography>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Instructions />
      </Box>

      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: { xs: 2, sm: 4 },
            '& .MuiStepLabel-label': {
              typography: { xs: 'caption', sm: 'body2' },
              mt: { xs: 0.5, sm: 1 }
            },
            '& .MuiStep-root': {
              px: { xs: 0.5, sm: 1 }
            },
            '& .MuiStepConnector-line': {
              borderColor: 'grey.400',
              minHeight: { xs: '1px', sm: '2px' },
              position: 'relative',
              top: { xs: '8px', sm: '5px' }
            },
          }}
        >
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
            sx={{ 
              width: '100%', 
              maxWidth: { xs: '100%', sm: '400px' }, 
              margin: '0 auto' 
            }}
          >
            <CameraCapture onCapture={handleImageCapture} />
          </Stack>
        )}

        {activeStep === 1 && capturedImage && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
            maxWidth: { xs: '100%', sm: '800px' },
            margin: '0 auto'
          }}>

            {isLoading && (
                <Box sx={{ 
                  position: 'absolute',
                  top: '75%',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  zIndex: 1000,
                  padding: '20px'
                }}>
                  <CircularProgress size={60} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {isProcessingImage ? 'Processing Image...' : 'Searching Products...'}
                  </Typography>
                 </Box>
                )}
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              Review Your Image
            </Typography>

            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 1, sm: 2 }, 
                width: '100%',
                backgroundColor: '#f8f8f8',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={capturedImage}
                alt="Captured part"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  maxHeight: '500px',
                  borderRadius: '4px'
                }}
              />
            </Paper>

            <TextField
              fullWidth
              label="Add additional search terms (optional)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter part number, description, or other details"
              sx={{ 
                mt: 2,
                maxWidth: '100%'
              }}
            />

            <Stack spacing={2} sx={{ width: '100%', mt: 2 }}>
            <TextField
            fullWidth
            label="Part Number/SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Enter specific part number if known"
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              select
              label="Product Type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              SelectProps={{
                native: true
            }}
            >
            <option value=""></option>
            <option value="door_handle">Door Handle</option>
            <option value="window_part">Window Part</option>
            <option value="latch">Latch</option>
            <option value="hinge">Hinge</option>
            <option value="dummy_handle">Dummy Handle</option>
            </TextField>

            <TextField
            fullWidth
            select
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            SelectProps={{
                native: true
            }}
            >
            <option value=""></option>
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
            </TextField>
            </Box>

            <TextField
            fullWidth
            label="Color/Finish"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="e.g., Bronze, White, Black"
            />
            </Stack>



            <Typography 
              variant="body2" 
              color="text.secondary"
              align="center"
              sx={{ px: { xs: 2, sm: 0 } }}
            >
              Please ensure the image is clear and well-lit before proceeding
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 },
              flexDirection: { xs: 'column', sm: 'row' },
              width: { xs: '100%', sm: 'auto' },
              mt: 2
            }}>
              <Button 
                variant="outlined"
                color="primary"
                onClick={() => setActiveStep(0)}
                startIcon={<RefreshIcon />}
                disabled={isLoading}
                fullWidth={true}
                sx={{
                  minWidth: { xs: '100%', sm: '150px' },
                  color: '#000000',
                  borderColor: '#000000',
                  '&:hover': {
                    borderColor: '#000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#000000'
                  }
                }}
              >
                Retake Photo
              </Button>
        
              <Button 
                variant="contained" 
                onClick={() => handleIdentification(capturedImage)}
                startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
                disabled={isLoading}
                fullWidth={true}
                sx={{
                  minWidth: { xs: '100%', sm: '150px' },
                  backgroundColor: '#48ad4d',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#48ad4d'
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#ffffff'
                  }
                }}
              >
                {isLoading ? (isProcessingImage ? 'Processing...' : 'Searching...') : 'Identify Part'}
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && capturedImage && (
          <ResultDisplay 
          identificationResult={{ 
            image: capturedImage
          }} 
          onRetry={handleRetry}
          filters={{
            sku,
            color,
            brand
          }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default PartIdentificationPage;
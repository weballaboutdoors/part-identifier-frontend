import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  Button, 
  Stack, 
  Link as MuiLink, 
  TextField, 
  CircularProgress 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Refresh as RefreshIcon, Search as SearchIcon } from '@mui/icons-material';
import CameraCapture from './CameraCapture';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';
import Instructions from '../../components/Instructions';
import { identifyPart } from '../../services/api';
import { 
  Category, 
  FormState, 
  PartCategoriesType, 
  SearchFilters, 
  FinishOption, 
  LocationOption 
} from '../../types/types';

const PART_CATEGORIES: PartCategoriesType = {
  door_handles: {
    label: "Door Handles",
    subcategories: {
      style: ["Traditional", "Contemporary", "Tribeca", "Newbury", "Albany", "Covington"],
      type: ["Lever", "Knob", "Handle Set", "Deadbolt", "Passage", "Gliding Door", "Dummy", "Active", "Passive", "No Thumbturn"],
      operation: ["Left-hand", "Right-hand", "Universal"]
    },
    commonSkus: {
      "albany": ["9007549", "9007550", "9007551", "9018931"],
      "covington": ["2578935"],
      "newbury": ["2579614"]
    }
  },
  window_parts: {
    label: "Window Parts",
    subcategories: {
      type: ["Operators", "Sash Locks", "Handles", "Keepers", "Egress"],
      operation: ["Left-hand", "Right-hand", "Dual"],
      location: ["Top", "Bottom", "Left", "Right", "Center"]
    },
    commonSkus: {
      "operators": ["1361484", "1521105", "1361483"],
      "sash_locks": ["0873340", "0873341", "0873342"]
    }
  },
  gliding_door_parts: {
    label: "Gliding Door Parts",
    subcategories: {
      type: ["Locks", "Handles", "Latches"],
      operation: ["Left-hand", "Right-hand", "Universal", "Active", "Passive", "Dual"]
    },
    commonSkus: {
      "handles": ["2562032", "2565696", "2573605"]
    }
  },
  latches: {
    label: "Latches",
    subcategories: {
      type: ["Multi-point", "Single Point", "Deadbolt"]
    }
  },
  hinges: {
    label: "Hinges",
    subcategories: {
      type: ["Butt", "Piano", "Spring", "Ball Bearing"]
    }
  }
};

const FINISHES: FinishOption[] = [
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "bronze", label: "Bronze" },
  { value: "nickel", label: "Nickel" },
  { value: "brass", label: "Brass" },
  { value: "stone", label: "Stone" },
  { value: "satin", label: "Satin" },
  { value: "gold", label: "Gold" }
];

const LOCATIONS: LocationOption[] = [
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "both", label: "Both Sides" }
];

const steps = ['Capture / Upload', 'Review Image', 'View Results'];

const PartIdentificationPage: React.FC = () => {
  console.log('PartIdentificationPage rendering');
  const [activeStep, setActiveStep] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [identificationResult, setIdentificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [capturedFilename, setCapturedFilename] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const [formState, setFormState] = useState<FormState>({
    sku: '',
    productType: '',
    subType: '',
    style: '',
    operation: '',
    location: '',
    color: '',
    brand: '',
    finish: ''
  });

  const handleFormChange = (field: keyof FormState, value: string) => {
    setFormState(prev => {
      const newState = { ...prev, [field]: value };
      
      // Reset dependent fields when product type changes
      if (field === 'productType') {
        newState.subType = '';
        newState.style = '';
        newState.operation = '';
      }
      
      return newState;
    });
  };

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
    setFormState({
      sku: '',
      productType: '',
      subType: '',
      style: '',
      operation: '',
      location: '',
      color: '',
      brand: '',
      finish: ''
    });
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
        
        const searchParams = {
            text_query: searchQuery.trim(),
            ...formState
        };

        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        setIsProcessingImage(false);
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

  const renderCategoryFields = () => {
    const category = PART_CATEGORIES[formState.productType as keyof typeof PART_CATEGORIES];
    if (!category) return null;
  
    const { subcategories } = category;
  
    const textFieldStyles = {
      mb: 2,
      '& .MuiInputLabel-root': {
        transform: 'translate(14px, -9px) scale(0.75)',
        backgroundColor: '#fff',
        padding: '0 8px',
      },
      '& .MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
      },
      '& .MuiSelect-select': {
        padding: '16px 14px',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.87)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#48ad4d',
        },
      }
    };
  
    return (
      <>
        {subcategories.type && (
          <TextField
            fullWidth
            select
            label="Type"
            value={formState.subType}
            onChange={(e) => handleFormChange('subType', e.target.value)}
            SelectProps={{ 
              native: true,
            }}
            sx={textFieldStyles}
          >
            <option value="">Select Type</option>
            {subcategories.type.map((type: string) => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </TextField>
        )}
  
        {subcategories?.style && subcategories.style.length > 0 && (
          <TextField
            fullWidth
            select
            label="Style"
            value={formState.style}
            onChange={(e) => handleFormChange('style', e.target.value)}
            SelectProps={{ 
              native: true,
            }}
            sx={textFieldStyles}
          >
            <option value="">Select Style</option>
            {subcategories.style.map((style: string) => (
              <option key={style} value={style.toLowerCase()}>{style}</option>
            ))}
          </TextField>
        )}
  
        {subcategories?.operation && subcategories.operation.length > 0 && (
          <TextField
            fullWidth
            select
            label="Operation"
            value={formState.operation}
            onChange={(e) => handleFormChange('operation', e.target.value)}
            SelectProps={{ 
              native: true,
            }}
            sx={textFieldStyles}
          >
            <option value="">Select Operation</option>
            {subcategories.operation.map((op: string) => (
              <option key={op} value={op.toLowerCase()}>{op}</option>
            ))}
          </TextField>
        )}
      </>
    );
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
        <Stepper activeStep={activeStep} sx={{ mb: { xs: 2, sm: 4 } }}>
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
          <Stack spacing={2} alignItems="center">
            <CameraCapture onCapture={handleImageCapture} />
            <ImageUpload onUpload={handleImageUpload} />
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

            <Stack spacing={2} sx={{ width: '100%', mt: 2 }}>
              <TextField
                fullWidth
                label="Additional Search Terms"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter part number, description, or other details"
              />

              <TextField
                fullWidth
                label="Part Number/SKU"
                value={formState.sku}
                onChange={(e) => handleFormChange('sku', e.target.value)}
                placeholder="Enter specific part number if known"
              />

              <TextField
                fullWidth
                select
                label="Product Type"
                value={formState.productType}
                onChange={(e) => handleFormChange('productType', e.target.value)}
                SelectProps={{ 
                  native: true,
                }}
                sx={{
                  mb: 2,
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                    backgroundColor: '#fff',
                    padding: '0 8px',
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                  '& .MuiSelect-select': {
                    padding: '16px 14px',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#48ad4d',
                    }
                  }
                }}
              >
                <option value="">Select Product Type</option>
                {Object.entries(PART_CATEGORIES).map(([value, category]) => (
                  <option key={value} value={value}>{category.label}</option>
                ))}
              </TextField>

              {renderCategoryFields()}

              <TextField
                fullWidth
                select
                label="Location"
                value={formState.location}
                onChange={(e) => handleFormChange('location', e.target.value)}
                SelectProps={{ 
                  native: true,
                }}
                sx={{
                  mb: 2,
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                    backgroundColor: '#fff',
                    padding: '0 8px',
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                  '& .MuiSelect-select': {
                    padding: '16px 14px',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#48ad4d',
                    }
                  }
                }}
              >
                <option value="">Select Location</option>
                {LOCATIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </TextField>

              <TextField
                fullWidth
                select
                label="Select Finish"
                value={formState.finish}
                onChange={(e) => handleFormChange('finish', e.target.value)}
                SelectProps={{ 
                  native: true,
                }}
                sx={{
                  mb: 2,
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                    backgroundColor: '#fff',
                    padding: '0 8px',
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                  '& .MuiSelect-select': {
                    padding: '16px 14px',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#48ad4d',
                    }
                  }
                }}
              >
                <option value="">Select Finish</option>
                {FINISHES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Brand"
                value={formState.brand}
                onChange={(e) => handleFormChange('brand', e.target.value)}
                placeholder="e.g., Andersen, Emtek"
              />
            </Stack>

            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 },
              flexDirection: { xs: 'column', sm: 'row' },
              width: { xs: '100%', sm: 'auto' },
              mt: 2
            }}>
              <Button 
                variant="outlined"
                onClick={handleRetry}
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
                    backgroundColor: '#3d9341'
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
              image: capturedImage,
              ...identificationResult
            }} 
            onRetry={handleRetry}
            filters={formState}
          />
        )}
      </Paper>
    </Box>
  );
};

export default PartIdentificationPage;
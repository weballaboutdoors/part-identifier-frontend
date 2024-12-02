import React, { useState } from 'react';
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { ApiResponse } from '../../types/types';


interface ResultDisplayProps {
    identificationResult: {
      image: string;  // base64 or URL string
    };
    onRetry: () => void;
  }

const ResultDisplay: React.FC<ResultDisplayProps> = ({ identificationResult, onRetry }) => {  // Add onRetry here
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert base64 image to file
      const base64Response = await fetch(identificationResult.image);
      const blob = await base64Response.blob();
      const file = new File([blob], "captured-image.jpg", { type: 'image/jpeg' });

      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      formData.append('min_confidence', '50.0');

      // Make API call to your backend
      const response = await fetch('http://localhost:8000/api/v1/identify', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to identify part');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 1, mb: 2, maxWidth: 640 }}>
      <img 
          src={identificationResult.image} 
          alt="Captured part" 
          style={{ width: '100%', height: 'auto' }} 
        />
      </Paper>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Typography variant="body1" sx={{ mb: 2 }}>
        Is this image clear enough?
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading ? <CircularProgress size={24} /> : <Check />}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Identifying...' : 'Yes, Identify Part'}
        </Button>
        
        <Button
          variant="outlined"
          color="error"
          startIcon={<Close />}
          onClick={onRetry}
          disabled={isLoading}
        >
          No, Retake Photo
        </Button>
      </Box>
    </Box>
  );
};

export default ResultDisplay;
import React, { useState } from 'react';
import { Box, Button, Paper, Typography, CircularProgress, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { Check, Close, ShoppingCart } from '@mui/icons-material';
import { ShopifyProduct } from '../../types/types';

import axios from 'axios';
interface ResultDisplayProps {
  identificationResult: {
    image: string;  // base64 or URL string
  };
  onRetry: () => void;
}



const ResultDisplay: React.FC<ResultDisplayProps> = ({ identificationResult, onRetry }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchingProducts, setMatchingProducts] = useState<ShopifyProduct[]>([]);  
  const [identificationComplete, setIdentificationComplete] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Debug log
      console.log('Starting identification process');
      
      const base64Response = await fetch(identificationResult.image);
      const blob = await base64Response.blob();
      const file = new File([blob], "captured-image.jpg", { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('image', file);
      formData.append('min_confidence', '50.0');

      // Debug log
      console.log('Sending request to backend');

      const response = await axios.post(
        'http://localhost:8000/api/v1/identify',
        formData,
        {
          headers: {
            'X-API-Key': process.env.REACT_APP_API_KEY || '',
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
          withCredentials: true // Add this
        }
      );

      console.log('Response received:', response.data);
      
      if (response.data.matching_products?.items) {
        setMatchingProducts(response.data.matching_products.items);
      }
      
      setIdentificationComplete(true);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
        setError(error.response?.data?.detail || error.message);
      } else {
        console.error('Error:', error);
        setError('Failed to identify part');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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

      {!identificationComplete ? (
        <>
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
        </>
      ) : (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Matching Products ({matchingProducts.length})
          </Typography>
          
          <Grid container spacing={3}>
            {matchingProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  {product.image_url && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image_url}
                      alt={product.title}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SKU: {product.sku}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                    <Typography variant="body2" color={product.available ? "success.main" : "error.main"}>
                      {product.available ? `In Stock (${product.inventory_quantity})` : 'Out of Stock'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      startIcon={<ShoppingCart />}
                      disabled={!product.available}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Button
            variant="outlined"
            onClick={onRetry}
            sx={{ mt: 3 }}
          >
            Take Another Photo
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ResultDisplay;
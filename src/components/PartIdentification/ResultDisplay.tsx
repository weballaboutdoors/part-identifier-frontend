import React, { useState } from 'react';
import { Box, Button, Paper, Typography, CircularProgress, Grid, Card, CardContent, CardMedia, CardActions, Tooltip, IconButton } from '@mui/material';
import { Check, Close, ShoppingCart, ContentCopy } from '@mui/icons-material';
import { ShopifyProduct } from '../../types/types';
import axios from 'axios';

interface ResultDisplayProps {
  identificationResult: {
    image: string;
    matching_products?: ShopifyProduct[];
  };
  onRetry: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ identificationResult, onRetry }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchingProducts, setMatchingProducts] = useState<ShopifyProduct[]>([]);  
  const [identificationComplete, setIdentificationComplete] = useState(false);
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  // Add function to sort products
  const getSortedMatches = (products: ShopifyProduct[]) => {
    return products.sort((a, b) => {
      // Sort by relevance score first
      if ((b.relevance_score || 0) !== (a.relevance_score || 0)) {
        return (b.relevance_score || 0) - (a.relevance_score || 0);
      }
      // Then by availability
      if (a.available !== b.available) {
        return b.available ? -1 : 1;
      }
      // Then by inventory quantity
      return (b.inventory_quantity || 0) - (a.inventory_quantity || 0);
    });
  };

  // Add function to handle SKU copying
  const handleCopySku = async (sku: string) => {
    try {
      await navigator.clipboard.writeText(sku);
      setCopiedSku(sku);
      setTimeout(() => setCopiedSku(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy SKU:', err);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
        console.log('Starting identification process');
        
        const base64Response = await fetch(identificationResult.image);
        const blob = await base64Response.blob();
        const file = new File([blob], "captured-image.jpg", { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('image', file);
        formData.append('min_confidence', '75.0');
        console.log('Image file created:', file.name, file.type, file.size);

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
                withCredentials: true
            }
        );

        console.log('Response received:', response.data);
        
        if (response.data.matching_products) {
            console.log('Matching Products:', response.data.matching_products);
            setMatchingProducts(response.data.matching_products);
            
            if (response.data.matching_products.length === 0) {
                setError('No high-confidence matches found. Please try a clearer image.');
            }
        } else {
            setError('No matching products found.');
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
    <Paper 
      elevation={3} 
      sx={{ 
        p: 1, 
        mb: 2, 
        maxWidth: 640,
        backgroundColor: '#f8f8f8',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box
        component="img"
        src={identificationResult.image}
        alt="Captured part"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
          maxHeight: '400px',
          objectFit: 'contain',
          margin: '0 auto'
        }}
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
          {getSortedMatches(matchingProducts).map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 400,
                minHeight: 400
              }}>
                {product.image_url && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image_url}
                    alt={product.title}
                    sx={{ 
                      objectFit: 'contain',
                      backgroundColor: '#f5f5f5',
                      p: 1
                    }}
                  />
                )}
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{
                      height: '3em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {product.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      SKU: {product.sku}
                    </Typography>
                    <Tooltip title={copiedSku === product.sku ? "Copied!" : "Copy SKU"}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleCopySku(product.sku)}
                        color={copiedSku === product.sku ? "success" : "default"}
                      >
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color={product.available ? "success.main" : "error.main"}>
                    {product.available ? `In Stock (${product.inventory_quantity})` : 'Out of Stock'}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, mt: 'auto' }}>
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
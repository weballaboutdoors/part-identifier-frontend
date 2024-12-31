import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  CircularProgress, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Tooltip, 
  IconButton, 
  Link, 
  Stack, 
  Divider 
} from '@mui/material';
import { 
  Check, 
  Close, 
  ShoppingCart, 
  ContentCopy, 
  CameraAlt,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Chat as ChatIcon,
  Search as SearchIcon 
} from '@mui/icons-material';
import { ShopifyProduct } from '../../types/types';
import axios from 'axios';
import { PartFeedback } from './PartFeedback';

interface ResultDisplayProps {
  identificationResult: {
    image: string;
    matching_products?: ShopifyProduct[];
    identification_id?: number;
  };
  onRetry: () => void;
  filters?: {
    sku?: string;
    color?: string;
    brand?: string;
  };
}

const NoResultsCard = () => (
  <Card sx={{ 
    maxWidth: 1200, 
    width: '100%',
    mx: 'auto', 
    mt: 3,
    mb: 3,
    boxShadow: 3,
    border: '1px solid #e0e0e0'
  }}>
    
    <CardContent>
    <Typography 
        variant="body2" 
        sx={{ 
          mb: 2, 
          backgroundColor: '#f5f5f5', 
          p: 1, 
          borderRadius: 1,
          fontStyle: 'italic'
        }}
      >
        Note: This part identification tool is currently in beta. While we strive for accuracy, results may not be perfect. Please verify part numbers and that the part is correct before ordering.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#000000' }}>
        No Match Found? Need Additional Help?
      </Typography>
      
      <Typography variant="body1" color="black" paragraph>
        Our customer service team is here to assist you with your search!
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
        Contact Us
      </Typography>

      <Stack spacing={2}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<PhoneIcon />}
          onClick={() => window.location.href = 'tel:1-800-123-4567'}
          sx={{
            borderColor: '#000000',
            backgroundColor: '#48ad4d',
            '& .MuiSvgIcon-root': {
              color: '#000000'
            },
            color: '#000000',
            '&:hover': {
              borderColor: '#48ad4d',
              backgroundColor: '#48ad4d'
            }
          }}
        >
          Call Us: 816-221-6543
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<EmailIcon />}
          onClick={() => window.location.href = 'mailto:support@example.com'}
          sx={{
            borderColor: '#000000',
            backgroundColor: '#48ad4d',
            '& .MuiSvgIcon-root': {
              color: '#000000'
            },
            color: '#000000',
            '&:hover': {
              borderColor: '#48ad4d',
              backgroundColor: '#48ad4d'
            }
          }}
        >
          Email Support
        </Button>

        
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="black" align="center">
          Available Monday-Friday: 7am-4pm CST
        </Typography>
      </Box>
    </CardContent>
  </Card>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ identificationResult, onRetry, filters }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchingProducts, setMatchingProducts] = useState<ShopifyProduct[]>([]);  
  const [identificationComplete, setIdentificationComplete] = useState(false);
  const [copiedSku, setCopiedSku] = useState<string | null>(null);
  const [identificationId, setIdentificationId] = useState<number | null>(null);

  const getSortedMatches = (products: ShopifyProduct[]) => {
    return products.sort((a, b) => {
      if (a.exact_sku_match && !b.exact_sku_match) return -1;
      if (!a.exact_sku_match && b.exact_sku_match) return 1;
      
      if ((b.confidence_score || 0) !== (a.confidence_score || 0)) {
        return (b.confidence_score || 0) - (a.confidence_score || 0);
      }
      
      if ((b.relevance_score || 0) !== (a.relevance_score || 0)) {
        return (b.relevance_score || 0) - (a.relevance_score || 0);
      }
      
      if (a.available !== b.available) {
        return b.available ? 1 : -1;
      }
      
      return (b.inventory_quantity || 0) - (a.inventory_quantity || 0);
    });
  };

  const handleCopySku = async (sku: string) => {
    try {
      await navigator.clipboard.writeText(sku);
      setCopiedSku(sku);
      setTimeout(() => setCopiedSku(null), 2000);
    } catch (err) {
      console.error('Failed to copy SKU:', err);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setIsProcessingImage(true);
    setError(null);
  
    try {
      console.log('Starting identification process');
      
      const base64Response = await fetch(identificationResult.image);
      const blob = await base64Response.blob();
      const file = new File([blob], "uploaded_image_" + Date.now() + ".jpg", { type: 'image/jpeg' });
  
      const formData = new FormData();
      formData.append('image', file);
      formData.append('min_confidence', '75.0');
      
      if (filters?.sku) {
        formData.append('text_query', filters.sku);
        console.log('Adding SKU to search:', filters.sku);
      }
  
      setIsProcessingImage(false);
  
      const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://part-identifier-app-09f6c3e0b9b0.herokuapp.com/api/v1/identify'
        : 'http://localhost:8000/api/v1/identify';
  
      const response = await axios.post(
        API_URL,
        formData,
        {
          headers: {
            'X-API-Key': process.env.REACT_APP_API_KEY || '',
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: false
        }
      );
  
      console.log('Response received:', response.data);
      
      if (response.data.matching_products) {
        console.log('Matching Products:', response.data.matching_products);
        setMatchingProducts(response.data.matching_products);
        setIdentificationComplete(true);
        setIdentificationId(response.data.identification_id);
        identificationResult.identification_id = response.data.identification_id;
        setError(null);
      } else {
        setError('No matching products found.');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }

  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Paper 
        elevation={5} 
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

      <NoResultsCard />


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

          {isLoading && (
            <Box sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1000
            }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {isProcessingImage ? 'Processing Image...' : 'Searching Products...'}
              </Typography>
            </Box>
          )}

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
                  maxHeight: 460,
                  minHeight: 460,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('.feedback-button, .copy-button')) {
                    window.open(`https://andersen-window-door-parts.myshopify.com/products/${product.handle}`, '_blank');
                  }
                }}             
                >
                  {product.image_url && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image_url}
                      alt={product.title}
                      sx={{ 
                        objectFit: 'contain',
                        backgroundColor: 'white',
                        p: 1
                      }}
                    />
                  )}
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    pb: 1
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopySku(product.sku);
                          }}
                          className="copy-button"
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

                    <Box sx={{ mt: 1 }}>
                      <PartFeedback
                        identificationId={identificationId || 0}
                        predictedSku={product.sku}
                        onFeedbackSubmit={() => {
                          console.log('Feedback submitted for SKU:', product.sku);
                        }}
                      />
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, mt: 'auto' }}>
                    <Button 
                      size="small" 
                      startIcon={<ShoppingCart />}
                      disabled={!product.available}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://andersen-window-door-parts.myshopify.com/cart/add?id=${product.variant_id}&quantity=1`, '_blank');
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', gap: 7, justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={onRetry}
              startIcon={<CameraAlt />}
              sx={{ 
                minWidth: '180px',
                backgroundColor: '#48ad4d',
                color: '#000000',
                '& .MuiSvgIcon-root': {
                  color: '#000000'
                }
              }}
            >
              Take Another Photo
            </Button>
            <Button
              variant="contained"
              component={Link as any}
              onClick={onRetry}
              to="/"
              startIcon={<SearchIcon />}
              sx={{ 
                minWidth: '180px',
                backgroundColor: '#48ad4d',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#48ad4d'
                },
                '& .MuiSvgIcon-root': {
                  color: '#000000'
                }
              }}
            >
              Search Another Part
            </Button>
          </Box>

          <NoResultsCard />
        </Box>
      )}
    </Box>
  );
};

export default ResultDisplay;
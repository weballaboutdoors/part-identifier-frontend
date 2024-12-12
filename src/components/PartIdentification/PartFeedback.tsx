import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Alert,
  Box,
  Typography,
  Stack
} from '@mui/material';
import { 
  ThumbUpAlt, 
  ThumbDownAlt, 
  Help,
  CheckCircleOutline,
  ErrorOutline,
  QuestionMark
} from '@mui/icons-material';

interface FeedbackProps {
  identificationId: number;
  predictedSku: string;
  onFeedbackSubmit: () => void;
}

export const PartFeedback: React.FC<FeedbackProps> = ({ 
  identificationId, 
  predictedSku, 
  onFeedbackSubmit 
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (feedbackType: 'correct' | 'possible' | 'wrong') => {
    try {
      const response = await fetch(`/api/feedback/${identificationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          predicted_sku: predictedSku,
          feedback_type: feedbackType,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit feedback');

      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        onFeedbackSubmit();
      }, 1500);

    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <>
      <Button 
        variant="contained"
        color="primary"
        size="small"
        
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          setOpen(true);
        }}
        startIcon={<Help />}
        sx={{ 
          width: '100%',
          color: '#000000',
          '& .MuiSvgIcon-root': {
            color: '#000000'
          },
          mt: 1,
          mb: 1
        }}
      >
        Provide Feedback
      </Button>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: '320px'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div">
            Rate this Match
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            SKU: {predictedSku}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Thank you for your feedback!</Alert>}
          
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleOutline />}
              onClick={() => handleSubmit('correct')}
              sx={{
                borderRadius: 2,
                py: 1,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              }}
            >
              Correct Match
            </Button>

            <Button
              variant="contained"
              color="warning"
              startIcon={<QuestionMark />}
              onClick={() => handleSubmit('possible')}
              sx={{
                borderRadius: 2,
                py: 1,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              }}
            >
              Possible Match
            </Button>

            <Button
              variant="contained"
              color="error"
              startIcon={<ErrorOutline />}
              onClick={() => handleSubmit('wrong')}
              sx={{
                borderRadius: 2,
                py: 1,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              }}
            >
              Wrong Match
            </Button>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
          <Button 
            variant="outlined" 
            onClick={() => setOpen(false)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              color: 'text.secondary',
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';

const PartScanner: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const webcamRef = React.useRef<Webcam>(null);

    const capture = async () => {
        if (webcamRef.current) {
            setIsLoading(true);
            try {
                const imageSrc = webcamRef.current.getScreenshot();
                
                // Send to backend
                const response = await fetch('http://localhost:8000/api/identify-part', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: imageSrc }),
                });
                
                const data = await response.json();
                setResult(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ marginBottom: 16 }}
            />
            <Button
                variant="contained"
                startIcon={<CameraAlt />}
                onClick={capture}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Identify Part'}
            </Button>
            
            {result && (
                <Box mt={2}>
                    <Typography variant="h6">Identified Part:</Typography>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </Box>
            )}
        </Box>
    );
};

export default PartScanner;
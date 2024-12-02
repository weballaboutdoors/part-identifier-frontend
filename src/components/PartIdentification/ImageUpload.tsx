import React from 'react';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      component="label"
      startIcon={<UploadIcon />}
      sx={{ width: 200, height: '40px', textTransform: 'none', fontSize: '1rem' }}
    >
      Upload Image
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />
    </Button>
  );
};

export default ImageUpload;
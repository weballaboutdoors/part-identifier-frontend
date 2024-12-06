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
          console.log('File selected:', file); // Debug log
          onImageSelect(file);
      }
  };

  return (
      <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
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
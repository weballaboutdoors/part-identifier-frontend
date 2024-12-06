import React from 'react';

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
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    />
  );
};

export default ImageUpload;
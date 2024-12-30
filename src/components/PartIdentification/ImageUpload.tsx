import React from 'react';

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      style={{ display: 'none' }}
      id="image-upload-input"
    />
  );
};

export default ImageUpload;
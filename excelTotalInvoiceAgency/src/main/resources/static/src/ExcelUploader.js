import React, { useState } from 'react';

const ExcelUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    fetch('http://localhost:8080/upload?customer_id=1', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Upload failed:', error);
      });
    setSelectedFile(null);
  };

  return (
    <div className="uploader-container">
      <label htmlFor="file-upload" className="upload-label">
        Seleziona un file Excel
      </label>
      <input
        type="file"
        id="file-upload"
        className="file-input"
        onChange={handleFileChange}
      />
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Carica file
      </button>
    </div>
  );
};

export default ExcelUploader;
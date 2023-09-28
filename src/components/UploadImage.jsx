import React, { useState } from 'react';
// import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const UploadImage = props => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    const uniqueKey = uuidv4();
    const formData = new FormData();
    formData.append('image', selectedFile, uniqueKey);
    try {
      const response = await fetch('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="left-div">
      <form className="make-row" onSubmit={handleUpload} id="upload-post">
        <div>
          <input type="file" name="file" onChange={handleFileInput} required data-testid="file-input"/>
        </div>
        <div>
          <input type="submit" value="Upload photo" data-testid="upload"/>
        </div>
      </form>
    </div>
  )
}

export default UploadImage;
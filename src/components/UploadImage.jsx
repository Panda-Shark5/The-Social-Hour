import React, { useState } from 'react';
// import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UploadImage = props => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log('handleUpload called'); // Add this line for debugging

    if (!selectedFile) {
      alert('Please choose a file before uploading.');
      return; // Don't proceed with the upload
    }
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
      alert('File Uploaded Successfully')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div class="left-div">
      <form class="make-row" onSubmit={handleUpload} id="upload-post">
      <div className="custom-file-input">
          <label htmlFor="file" className="upload-button">
            <FontAwesomeIcon icon={faUpload} /> 
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileInput}
            required
          />
       
        </div>
        <div>
          {/* <input type="submit" value="Upload photos" /> */}
          {/* <FontAwesomeIcon icon ={faPlusCircle} /> */}
          <button id='uploadbutton' type="submit" className="upload-button" onClick ={handleUpload}>
          <FontAwesomeIcon icon={faPlusCircle} /> 
        </button>
        
//     <div className="left-div">
//       <form className="make-row" onSubmit={handleUpload} id="upload-post">
//         <div>
//           <input type="file" name="file" onChange={handleFileInput} required data-testid="file-input"/>
//         </div>
//         <div>
//           <input type="submit" value="Upload photo" data-testid="upload"/>
        </div>
      </form>
    </div>
  )
}

export default UploadImage;
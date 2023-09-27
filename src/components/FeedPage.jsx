import { Link } from 'react-router-dom';
import UploadImage from './UploadImage';
import React, { useEffect, useState } from 'react';

const FeedPage = props => {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/images')
      .then(response => response.json())
      .then(data => setImageURLs(data.map(item => item.url)))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  

  return (
    <div class="whole-div">
      
      <header class="header">
        <div class="small-div">
          <UploadImage />
        </div>
        <h1>Social Hour</h1>
        <div class="small-div">
          <Link className='link' to='/login'>
            <h1>Logout</h1>
          </Link>
        </div>
        

      </header>
    
      <div>
        {imageURLs.map((url, index) => (
          <div>
            <img key={index} src={url} alt={`test-${index}`} height='500px' />
            <br></br>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedPage;
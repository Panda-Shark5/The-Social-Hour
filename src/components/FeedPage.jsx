import { Link } from 'react-router-dom';
import UploadImage from './UploadImage';
import { useState, useEffect } from 'react';
import LikeButton from './LikeButton';

const images = require.context('../assets', true);
const imageList = images.keys().map((image) => images(image));

const FeedPage = (props) => {
  const [postsObjects, setPostsObjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/images')
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setPostsObjects(data);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <div class='whole-div'>
      <header class='header'>
        <div class='small-div'>
          <UploadImage />
        </div>
        <h1>Social Hour</h1>
        <div class='small-div'>
          <Link className='link' to='/login'>
            <h1>Logout</h1>
          </Link>
        </div>
      </header>

      <div>
        {postsObjects
          .slice()
          .toReversed()
          .map((object, index) => (
            <div>
              <img
                key={index}
                src={object.img}
                alt={`test-${index}`}
                height='500px'
              />
              <br></br>
              <LikeButton id={object.id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedPage;

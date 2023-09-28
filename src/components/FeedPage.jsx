import { Link } from 'react-router-dom';
import UploadImage from './UploadImage';
import { useState, useEffect } from 'react';
import LikeButton from './LikeButton';
import Comments from './Comments';

const FeedPage = (props) => {
  const [postsObjects, setPostsObjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/images')
      .then((response) => response.json())
      .then((data) => {
        console.log('pic load data', data);
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
        <div className='small-div'>
          <Link className='link' to='/login'>
            <button id='logoutbutton'>
              <h1>Logout</h1>
            </button>
          </Link>
        </div>
      </header>

      <div>
        {postsObjects
          .slice()
          .toReversed()
          .map((object, index) => (
            <div className='polaroid-card'>
              <img
                className='polaroid-image'
                key={index}
                src={object.img}
                alt={`test-${index}`}
                height='700px'
                width='550px'
              />
              <br></br>
              <LikeButton id={object.id} likes={object.likes} />
              <Comments postId={object.id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedPage;

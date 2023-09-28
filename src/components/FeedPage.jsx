import { Link } from 'react-router-dom';
import UploadImage from './UploadImage';
import { useState, useEffect } from 'react';
import LikeButton from './LikeButton';
import Comments from './Comments';

const FeedPage = (props) => {
  const [commentsMap, setCommentsMap] = useState(new Map());
  const [postsObjects, setPostsObjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/comments')
      .then((response) => response.json())
      .then((response) => {
        console.log('comments data', response);
        console.log('accesing array', response.commentsInfo);

        // Organize comments into a map based on postId
        const newCommentsMap = new Map();

        response.commentsInfo.forEach((comment) => {
          const postId = comment.post_id;
          console.log(postId);
          if (!newCommentsMap.has(postId)) {
            newCommentsMap.set(postId, []);
          }

          newCommentsMap.get(postId).push(comment);
        });

        // Set the state with the new comments map
        setCommentsMap(newCommentsMap);
        console.log('comments map', newCommentsMap);
      })
      .catch((err) => console.error('Fetch comments error:', err));
  }, []); // Empty dependency array, so it runs only once on mount

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
    <div className='whole-div'>
      <header className='header'>
        <div className='small-div'>
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
          .reverse() // Corrected method name to reverse
          .map((object, index) => (
            <div className='polaroid-card' key={index}>
              <img
                className='polaroid-image'
                src={object.img}
                alt={`test-${index}`}
                height='700px'
                width='550px'
              />
              <br />
              <LikeButton id={object.id} likes={object.likes} />
              <Comments
                postId={object.id}
                comments={commentsMap.get(object.id) || []}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedPage;

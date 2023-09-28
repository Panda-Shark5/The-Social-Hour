import React, { useState, useEffect } from 'react';

function LikeButton(props) {
  const [likes, setLikes] = useState('');
  const [liked, setLiked] = useState(false);

  // setLikes(props.likes);

  useEffect(() => {
    // fetch('http://localhost:3001/api/likes')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('pic info', data);
    //   })
    //   .catch((err) => console.error('Fetch error:', err));
    setLikes(props.likes);
  }, []);

  async function handleClick(e) {
    console.log('e.target.id', e.target.id);
    const picId = e.target.id;

    try {
      const response = await fetch('http://localhost:3001/api/likes', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bestInteger: picId }),
      });
      if (!response.ok) {
        console.error('Request failed with status:', response.status);
        return;
      }
      const data = await response.json();
      console.log('Response Data', data);

      setLikes(data[0].likes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button
        id={props.id}
        className={`like-button ${liked ? 'liked' : ''}`} //dynamic class name based on whether it is like or not. If is liked the class is like-button.liked
        onClick={(e) => {
          handleClick(e);
          // setLikes(likes + 1);
          setLiked(true);
        }}
      >
        <i className={`fas fa-heart ${liked ? 'liked' : ''}`}></i>
      </button>
      <span> {likes} LIKE THIS</span>
    </div>
  );
}

export default LikeButton;

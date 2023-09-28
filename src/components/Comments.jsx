import React, { useState, useEffect } from 'react';

const Comments = (props) => {
  const [commentsBox, setCommentsBox] = useState([]);
  const [comment, setComment] = useState('');

  console.log(comment);

  console.log('before addComents');

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/comments')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('comments data', data);
  //     });
  // });

  // useEffect()

  //fetch to send comment to database
  function addComment(e) {
    console.log('inside comments');
    e.preventDefault();
    fetch('http://localhost:3001/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: props.postId, comment: comment }),
    })
      .then((commentResponse) => commentResponse.json())
      .then((jsonedComment) => {
        console.log('coment back from db', jsonedComment);
        setCommentsBox([...commentsBox, jsonedComment]);
      });
  }

  return (
    <div>
      <div className='comments-container'>
        {commentsBox.slice().map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <form onSubmit={addComment}>
        <input
          type='text'
          placehold='Type your comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type='submit' />
      </form>
    </div>
  );
};

export default Comments;

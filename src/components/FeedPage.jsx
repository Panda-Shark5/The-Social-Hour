import { Link } from "react-router-dom";
import UploadImage from "./UploadImage";
import { useState, useEffect } from "react";

const images = require.context("../assets", true);
const imageList = images.keys().map((image) => images(image));

const FeedPage = (props) => {
  const [postsObjects, setPostsObjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/images")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setPostsObjects(data)
        
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  
  async function handleClick(e) {

    console.log("e.target.id", e.target.id);

    const indexAndId = e.target.id.split("$")
    let id = Number(indexAndId[0])
    console.log('id', id)
    let index = Number(indexAndId[1])
    console.log('index', index)

    try {
      const response = await fetch("http://localhost:3001/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({bestInteger: id}),
      });
      const jsonedResponse = await response.json();
      console.log('Likes updated successfully:', jsonedResponse);

      // const postObjCopy = postsObjects.slice();
      
      // postObjCopy[index].likes = jsonedResponse[0].likes;
      const updatedPostsObjects = [...postsObjects];
      updatedPostsObjects[index].likes = jsonedResponse[0].likes;

      setPostsObjects(updatedPostsObjects);
    //  setPostsObjects(postObjCopy);
     return
    } catch (error) {
      console.error("Error:", error);
    }

  }

  return (
    <div class="whole-div">
      <header class="header">
        <div class="small-div">
          <UploadImage />
        </div>
        <h1>Social Hour</h1>
        <div class="small-div">
          <Link className="link" to="/login">
            <h1>Logout</h1>
          </Link>
        </div>
      </header>

      <div>
        {postsObjects.slice().toReversed().map((object, index) => (
          <div>
            <img key={index} src={object.img} alt={`test-${index}`} height="500px" />
            <br></br>
            <button id={String(object.id) + '$' + String(index)} onClick={handleClick}>
              LIKE
            </button>
            <span> {object.likes} like this</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;

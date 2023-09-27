import { Link } from 'react-router-dom';
import UploadImage from './UploadImage';


const images = require.context('../assets', true);
const imageList = images.keys().map(image => images(image));




const FeedPage = props => {

  fetch('/posts')
  .then()




  
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
        {imageList.map((image, index) => (
          <div>
            <img key={index} src={image} alt={`test-${index}`} height='500px' />
            <br></br>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedPage;
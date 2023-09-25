import { Link } from 'react-router-dom';
import UploadImage from './UploadImage';


const images = require.context('../assets', true);
const imageList = images.keys().map(image => images(image));




const FeedPage = props => {
  return (
    <div>
      <h1>Feed page</h1>
      <Link className='link' to='/login'>
        <h1>Logout</h1>
      </Link>
      <UploadImage />
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
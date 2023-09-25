import { Link } from 'react-router-dom';
import UploadImage from './UploadImage';

const FeedPage = props => {
  return(
    <div>
      <h1>Feed page</h1>
      <Link className='link' to='/login'>
        <h1>Logout</h1>
      </Link>
      <UploadImage/>
    </div>
  )
}

export default FeedPage;
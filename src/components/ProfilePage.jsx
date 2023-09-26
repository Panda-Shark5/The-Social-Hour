import { Link } from 'react-router-dom'


const ProfilePage = props => {
  return(
    <div>
      <h1>Profile page</h1>
      <Link className='link' to='/login'>
        <h1>Logout</h1>
      </Link>
    </div>
  )
}

export default ProfilePage;

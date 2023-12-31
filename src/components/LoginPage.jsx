import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      alert('Please enter a username and password');
      return;
    }
    console.log('button clicked');
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Registration successful, you can redirect the user or show a success message
        console.log('Login Successful');
        navigate('/feed'); // Redirects the user to the posts page.
      } else {
        // Handle registration failure, e.g., display an error message
        alert("Credentials don't match");
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    // <div class="main-div">
    //     <div class="centered-div">
    //         <h1>Welcome to Social Hour</h1>
    //         <p>Enter your credentials to login:</p>
    //         <form method="POST" action="http://localhost:3001/users/login" encType="multipart/form-data" id="upload-post">
    //             <div>
    //                 <label htmlFor="username">Username: </label>
    //                 <input type="text" name="username" id="username" /><br />
    //                 <label htmlFor="password">Password: </label>
    //                 <input type="text" name="password" id="username" /><br />
    //             </div>
    //             <div>
    //                 <input type="submit" value="Login" />
    //             </div>
    //         </form>
    //         <div> <Link className='link' to='/signup' >Click Here to Create an Account</Link> </div>
    //     </div>

    <div>
      <h1>Social Hour</h1>
      <p>Enter your credentials to login:</p>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name='username'
            id='username'
          />
          <br />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            id='password'
          />
          <br />
        </div>
        <div>
          <input type='submit' value='Login' />
        </div>
      </form>
      <div>
        <Link className='link' to='/signup'>
          Click Here to Create an Account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

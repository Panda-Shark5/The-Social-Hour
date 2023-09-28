import React from 'react';
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
   
    <div className="centered-container">
  <h1 className ='title'>The Social Hour</h1>
  <p>Enter your credentials to login:</p>
  <form onSubmit={handleLogin} className="login-form">
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        name="username"
        id="username"
      />
    </div>
    <div>
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        id="password"
      />
    </div>
    <div className="button-container">
      <input type="submit" value="Login" />
      <button id='createaccount'>
        <Link className="link" to="/signup">
          Create Account

        </Link>
      </button>
    </div>
  </form>
</div>
  );

};

export default LoginPage;

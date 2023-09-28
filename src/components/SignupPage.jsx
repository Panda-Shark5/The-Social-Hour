import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });


      if (response.status === 200) {
        navigate("/feed", { replace: true });
      } else {
        alert("username already exists");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-div">
  <div className="centered-div">
    <h1 className='title'>Create Account</h1>
    <p>Enter your credentials to register:</p>
    <form onSubmit={handleSignup} className="login-form">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
      </div>
      <div className="button-container">
        <input type="submit" value="Sign Up" />
        <button id='createaccount'>

          <Link className="link" to="/login">
            Already a User? Sign in!
          </Link>
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default SignupPage;

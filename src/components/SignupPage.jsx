import { Link } from 'react-router-dom'
import { useState } from 'react'


const SignupPage = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('button clicked')
        try {
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Registration successful, you can redirect the user or show a success message
            } else {
                // Handle registration failure, e.g., display an error message
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <div class="main-div">
            <div class="centered-div">
                <h1>Welcome To The CRUDverse</h1>
                <p>Enter your credentials to register:</p>
                <form method="POST" action="http://localhost:3001/users/register" encType="multipart/form-data" id="upload-post">
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" /><br />
                        <label htmlFor="password">Password: </label>
                        <input type="text" name="password" id="username" /><br />
                    </div>
                    <div>
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>
                <div> <Link className='link' to='/login' >Click Here to Log In To An Existing Account </Link> </div>
            </div>  
        </div>
    )
}

export default SignupPage;
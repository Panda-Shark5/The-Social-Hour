import { Link } from 'react-router-dom'
import { useState } from 'react'



const LoginPage = props => {

    return (
        <div class="main-div">
            <div class="centered-div">
                <h1>Welcome To The Codesmith Social Hour</h1>
                <p>Enter your credentials to login:</p>
                <form method="POST" action="http://localhost:3001/users/login" encType="multipart/form-data" id="upload-post">
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" /><br />
                        <label htmlFor="password">Password: </label>
                        <input type="text" name="password" id="username" /><br />
                    </div>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
                <div> <Link className='link' to='/signup' >Click Here to Create an Account</Link> </div>
            </div>
        
        </div>
    )
}

export default LoginPage;
import {Link} from 'react-router-dom'
import {useState} from 'react'


const SignupPage = props => {

    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    return (
   
        <div>
        <h1>Welcome To The CRUDverse</h1>
        <p>Enter your credentials to register:</p>
        <form method="POST" action = "http://localhost:3001/users/register" encType ="multipart/form-data" id = "upload-post">
            <div>
                <label htmlFor="username">Username:</label>
                <input type = "text" name = "username" id = "username"/><br/>
                <label htmlFor="password">Password</label>
                <input type = "text" name = "password" id = "username"/><br/>
            </div>
            <div>
                <input type="submit" value="Sign Up"/>
            </div>
        </form>
        <div> <Link className ='link' to ='/login' >Click Here to Log In To An Existing Account </Link> </div>
    </div>
    )
}

export default SignupPage;
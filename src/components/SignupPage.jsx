import {Link} from 'react-router-dom'
import {useState} from 'react'


const SignupPage = props => {

    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    return (
    <div>
        <h1>Welcome To The CRUDverse</h1>
        <p>Enter your credentials to register:</p>
        <div>Username: <input classname = 'input' onChange={(e) => {setUsernameInput(e.target.value)}} value = {usernameInput} /></div>
        <div>Password: <input classname = 'input' onChange={(e) => {setPasswordInput(e.target.value)}} value = {passwordInput} /></div>
        <button type = 'button' >Sign Up</button>
        <div> <Link classname ='link' to ='/login' >Click Here to Login </Link> </div>
    </div>
    )
}

export default SignupPage;
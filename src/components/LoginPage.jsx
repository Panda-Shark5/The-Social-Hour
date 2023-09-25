import {Link} from 'react-router-dom'
import {useState} from 'react'



const LoginPage = props => {
    
    
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    
    
    async function onLoginClick () {
        console.log('inside click handler. credentials are:', usernameInput, passwordInput )
        await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: usernameInput, password: passwordInput})
        })
    }

    const body = new FormData();
    body.append("username", usernameInput)
    body.append("password", passwordInput)




    return (
    <div>
        <h1>Welcome To The CRUDverse</h1>
        <p>Enter your credentials to login:</p>
        {/* <div>Username: <input className = 'input' onChange={(e) => {setUsernameInput(e.target.value)}} value = {usernameInput} /></div>
        <div>Password: <input className = 'input' onChange={(e) => {setPasswordInput(e.target.value)}} value = {passwordInput} /></div> */}
        {/* <button type = 'button' onClick = {() => onLoginClick()} >Login</button> */}
        <form method="POST" action = "http://localhost:3001/users/login" encType ="multipart/form-data" id = "upload-post">
            <div>
                <label htmlFor="username">Username:</label>
                <input type = "text" name = "username" id = "username"/><br/>
                <label htmlFor="password">Password</label>
                <input type = "text" name = "password" id = "username"/><br/>
            </div>
            <div>
                <input type="submit" value="Login"/>
            </div>
        </form>
        <div> <Link className ='link' to ='/signup' >Click Here to Sign Up </Link> </div>
    </div>
    )
}

export default LoginPage;
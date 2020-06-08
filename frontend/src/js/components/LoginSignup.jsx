import React, { useState, useContext, useEffect } from "react";
import "../../css/LoginSignup.css"
import Signup from './Signup'
import { AppContext } from './App'
import { Redirect } from "react-router-dom";

const axios = require('axios')
const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

function Login({handleSuccess}) {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${serverAddress}/login`, credentials)
        .then((res) => {
            if (res.data.token) {
                handleSuccess(credentials.username, res.data.token)
                return
            }
        })
        .catch((err) => {
            switch (err.response.status) {
                case 401:
                    setErrorMessage("Username or password incorrect.")
                    break;
                default: 
                    setErrorMessage('Oops, something went wrong')
                    break;
            }
        })
    }

    return (
        <div className="Login">
            <h1>Login</h1>
            <form method="post" onSubmit={handleSubmit}>
                <div className='formItem'>
                    <label htmlFor="username">Username </label>
                    <input type="text" id="username" name="username" required value={credentials.username} onChange={(e)=>setCredentials({...credentials, ['username']: e.target.value})}/>
                </div>
                <div className='formItem'>
                    <label htmlFor="pwd">Password </label>
                    <input type="password" id="pwd" name="password" required value={credentials.password} onChange={(e)=>setCredentials({...credentials, ['password']: e.target.value})}/>
                </div>
                <input className='submitButton' type='submit' value='Login'></input>
            </form>
        </div>
    )
}




function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true)
    const AppCtx = useContext(AppContext)
    const [redirectTo, setRedirectTo] = useState()
    
    useEffect(() => {
        if (AppCtx.loggedIn)
            setRedirectTo('my-patches')
    }, [AppCtx.loggedIn])

    const handleSuccess = (username, token) => {
        AppCtx.setUsername(username)
        AppCtx.setToken(token)
        localStorage.setItem('token', token)
        setRedirectTo('my-patches')
    }

    if (redirectTo) return <Redirect to={redirectTo} />

    return (
        <div className="LoginSignup">
            {isLogin ? <Login handleSuccess={handleSuccess} /> : <Signup handleSuccess={handleSuccess} />} /* form html */
            {isLogin ? (
                <div className="SignMeUp">
                    <p>Don't have an account?</p>
                    <button onClick={() => setIsLogin(false)} className="submitButton">Sign Up</button>
                </div>
            ) :null }
        </div>
    )
}
export default LoginSignup
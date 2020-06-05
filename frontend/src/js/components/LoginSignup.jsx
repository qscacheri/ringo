import React, { useState, useContext } from "react";
import "../../css/LoginSignup.css"
import Signup from './Signup'
import { AppContext } from './App'
import { Redirect } from "react-router-dom";
function Login() {
    return (
        <div className="Login">
            <h1>Login</h1>
            <form method="post">
                <label htmlhtmlFor="username">Username</label>
                <input type="text" id="username" name="username" required/>
                <br></br><br></br>
                <label htmlFor="pwd">Password</label>
                <input type="password" id="pwd" name="password" required/>
                <br></br><br></br>
            </form>
        </div>
    )
}




function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true)
    const AppContextConsumer = useContext(AppContext)
    const [redirectTo, setRedirectTo] = useState()
    
    const handleSuccess = (username, token) => {
        AppContextConsumer.setUsername(username)
        AppContextConsumer.setToken(token)
        setRedirectTo('workspace')
    }
    
    console.log(AppContextConsumer);
    console.log(AppContextConsumer.test);

    if (redirectTo) return <Redirect to={redirectTo} />

    return (
        <div className="LoginSignup">
            {isLogin ? <Login handleSuccess={handleSuccess} /> : <Signup handleSuccess={handleSuccess} />} /* form html */
            {isLogin ? (
                <nav>
                    <button onClick={() => setIsLogin(true)} >Login</button>
                    <div className="SignMeUp">
                        <p>Don't have an account?</p>
                        <button onClick={() => setIsLogin(false)} id="SignupBtn">Sign Up</button>
                    </div>
                </nav>
            ) :null }
        </div>
    )
}
export default LoginSignup
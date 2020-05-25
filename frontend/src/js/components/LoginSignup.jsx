import React, { useState } from "react";
import "../../css/LoginSignup.css"

function Login() {
    return (
        <div className="Login">
            <h1>Login</h1>
            <form method="post">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required/>
                <br></br><br></br>
                <label for="pwd">Password</label>
                <input type="password" id="pwd" name="password" required/>
                <br></br><br></br>
            </form>
        </div>
    )
}


function Signup() {
    return (
        <div className="Signup">
            <h1>Sign Up</h1>
            <form method="post">
                <label for="username">Set Username</label>
                <input type="text" id="username" name="username" required/>
                <br></br><br></br>
                <label for="pwd">Set Password</label>
                <input type="password" id="pwd" name="password" required/>
                <br></br><br></br>
                <label for="re-pwd">Re-Enter Password</label>
                <input type="password" id="re-pwd" name="re-password" required/>
                <br></br><br></br>
            </form>
        </div>
    )
}


function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true)
    
    return (
        <div className="LoginSignup">
            {isLogin ? <Login /> : <Signup />} /* form html */
            {isLogin ? (
                <nav>
                    <button onClick={() => setIsLogin(true)} >Login</button>
                    <div className="SignMeUp">
                        <p>Don't have an account?</p>
                        <button onClick={() => setIsLogin(false)} id="SignupBtn">Sign Up</button>
                    </div>
                </nav>
            ) : (
                <nav>
                    <button onClick={() => setIsLogin(true)} >Create Account</button>
                </nav>
            )}
        </div>
    )
}
export default LoginSignup
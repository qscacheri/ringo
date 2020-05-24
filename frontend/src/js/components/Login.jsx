import React, { useState } from "react";
import "../../css/Login.css"

function Login() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="Login">
            <h1>Login</h1>
            <form method="post">
                <p>Username <input type="text" name="username" required/></p>
                <p>Password <input type="password" name="password" required/></p>
            </form>

            <div className="loginNav">
                <button onClick={() => setIsLogin(true)} >Login</button>
                <button onClick={() => setIsLogin(false)} >Sign Up</button>
            </div>
        </div>
    )
}


function Signup() {
    return (
        <div className="Signup">
            <h1>Sign Up</h1>
            <form method="post">
                <p>Set Username <input type="text" name="username" required/></p>
                <p>Set Password <input type="password" name="password" required/></p>
                <p>Re-Enter Password <input type="password" name="re-password" required/></p>
            </form>

            <div className="loginNav">
                {/* <button onClick={() => setIsLogin(true)} >Login</button> */}
                <button onClick={() => setIsLogin(false)} >Sign Up</button>
            </div>
        </div>
    )
}


function LoginSignup() {
    return (
        isLogin ? <Login /> : <Signup />
    )
}
export default LoginSignup
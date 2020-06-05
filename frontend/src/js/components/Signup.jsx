import React, { useState } from 'react'
const axios = require('axios')
const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

const Signup = ({handleSuccess}) => {  
    const [credentials, setCredentials] = useState({username: 'qscacheri', email: 'qs', password: '1', passwordConfirmation: '1'})
    const [errorMessage, setErrorMessage] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${serverAddress}/signup`, credentials)
        .then((res) => {
            console.log(res);
            if (res.data.token) {
                handleSuccess(credentials.username, res.data.token)
                return
            }
        }).catch((err) => {
            console.log(err);
            
            switch(err.response.status) {
                case 409: 
                    setErrorMessage('User already exists')
                    break;
                case 400: 
                    setErrorMessage('Passwords do not match')
                    break;
                default: 
                    setErrorMessage('Oops, something went wrong')
                    break;
            }
        })
    }
    return (
        <div className="Signup">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='formItem'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={credentials.username} required onChange={(e)=>setCredentials({...credentials, ['username']: e.target.value})} />
                </div>
                <div className='formItem'>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={credentials.email} required onChange={(e)=>setCredentials({...credentials, ['email']: e.target.value})} />
                </div>

                <div className='formItem'>
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" id="pwd" name="password" value={credentials.password} required onChange={(e)=>setCredentials({...credentials, ['password']: e.target.value})}/>
                </div>
                <div className='formItem'>
                    <label htmlFor="re-pwd">Re-Enter Password:</label>
                    <input type="password" id="re-pwd" name="re-password" value={credentials.passwordConfirmation} required onChange={(e)=>setCredentials({...credentials, ['passwordConfirmation']: e.target.value})}/>
                </div>
                <input type='submit' value="Create Account"></input>
            </form>
            <h3>{errorMessage}</h3>
        </div>
    )
}

export default Signup
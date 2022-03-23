import React from 'react'
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';


export default function Login(){

    const userRef = useRef();
    const errRef = useRef();

    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

     useEffect(() => {
         userRef.current.focus();
     }, [])

     useEffect(() => {
         setErrorMessage('');
     }, [user, password])


return(
    <section class='loginSection'>

        <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p> 

        <h1 class="h1Gray">Login</h1>

        <form class="loginForm">

            <label class='inputTitle' htmlFor="email">Email</label> 

            <input 
                type="text"
                id="username"
                placeholder = "Enter Email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                /> 
           
            <label class='inputTitle' htmlFor="password">Password</label>
            <input class="inputPass"
                type="password"
                id="password"
                placeholder="Enter Password"
                ref={userRef}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                /> 
                
                <p class='forgotPassword'>
                    
                    <span className="forgotLine">

                        <a href={window.location.origin+"/Recover-Password"}>Forgot Password</a>
                    </span>
                </p>

                <button>Login</button>
           
        </form>

        <p class='createAccount'>
            
            <span className="createLine">
                
                <a href={window.location.origin+"/Signup"}>Create Account</a>
            </span>
        </p>
    </section>
)
}

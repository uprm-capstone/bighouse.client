import React from 'react'
import {useRef, useState, useEffect} from 'react';


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

        <br />

        <h1 class='loginTitle'>Login</h1>
        <form>
            <label class='emailText' htmlFor="email">Email</label> 

            <br /> 
            <br />

            <input 
                class='emailInput'
                type="text"
                id="username"
                placeholder = "Email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                /> 
                <br />
                <br />
                <br />

            <label class='passwordText' htmlFor="password">Password</label> <br /> <br />
            <input 
                class='passwordInput'
                type="password"
                id="password"
                placeholder="Password"
                ref={userRef}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                /> 
                
                <br />
                <br />
                <br />
                <br />

          
                <button class='loginButton'>Login</button>
           
        </form>

        <p class='createAccount'>
            Create Account <br />
            <span className="line">
                
                <a href="#"></a>
            </span>
        </p>
    </section>
)
}

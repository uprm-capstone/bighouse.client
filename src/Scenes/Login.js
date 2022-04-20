import React from 'react'
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Header from '../Components/Sections/Header.js';
import axios from 'axios';


export default function Login(){

    const userRef = useRef();
    const errRef = useRef();

    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const [success, setSuccess] = useState(false);

    const verifyLogin =(e)=>{
        e.preventDefault();
        if(!user || !password){
            return;
        }
        const aUser = {
            email:user,
            password:password,
            roles:["boss"]
        }

        // .catch((error) => {
        //     console.log(error);
        // })

        axios({
            method: 'GET',
            params: {user_email:user},
            url: `http://localhost:8008/users/user-by-email`
        })
            .then(res => {
                let data = res.data;
                console.log(res);
                localStorage.setItem('User', data.user_id);

                // Gets apartment which user occupies
                axios({
                    method: 'GET',
                    params: {user_id:data.user_id},
                    url: `http://localhost:8008/occupy/get-apartment-occupant-with-user`
                })
                .then(res => {
                    let aData = res.data;
                    console.log(aData);
                    console.log("In array: "+aData[0].apartment_id);
                    localStorage.setItem('Apartment', aData[0].apartment_id);

                    })

                // Authorizes and logs user
                axios({
                    method: 'GET',
                    params: aUser,
                    url: `http://localhost:8008/authorization`
                })
                .then(res => {
                    console.log(res);
                    localStorage.setItem('Token', res.data.tocken);

                    window.location.href = window.location.origin+'/Home';
                    })

                })
            .catch((error) => {
                console.log(error);
            })

        

    }

    useEffect(() => {
        userRef.current.focus();
        if(localStorage.getItem('Token')){
            if(localStorage.getItem('User')){
                window.location.href = window.location.origin+'/Home';
            }
            else{
                localStorage.removeItem('Token');
                localStorage.removeItem('Apartment');
            }
        }
        else{
            localStorage.removeItem('User');
            localStorage.removeItem('Apartment');
        }
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [user, password])


return(
    <>
    <Header /> 
    <section class='loginSection'>

        <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p> 

        <h1 class="h1Gray">Login</h1>

        <form class="loginForm" onSubmit={verifyLogin}>

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
                    <span className="line">

                        <a href={window.location.origin+"/Recover-Password"}> Forgot Password?</a>
                    </span>
                </p>        

           <button>Login</button>
        
        </form>

        <p class='createAccount'>
            
            <span className="line">
                
                <a href={window.location.origin+"/Signup"}>Create Account</a>
            </span>
        </p>
    </section>
    </>
)
}

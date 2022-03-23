import { useRef, useState, useEffect} from "react";
import Input from '../Components/Inputs/Input';
import Button from '../Components/Buttons/Button'; 


export default function RecoverPassword(){

    const userRef = useRef();
    const errRef = useRef();

    const[email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [email])

    return(
        <section class='loginSection'>
    
            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p> 
    
            <h1 class="h1Gray">Recover Password</h1>
    
            <form class="loginForm">
    
                <label class='inputTitle' htmlFor="email">Email</label> 

                <input 
                type="email"
                id="email" 
                placeholder="Enter Email" 
                ref={userRef} 
                autocomplete="on" 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} 
                required
                />

                <Button name="Send Link" /> 
                    <p class='createAccount'>
                        
                        <span className="line">
                            <a href={window.location.origin+"/Login"}>Log In</a>
                        </span>
                    </p>
        
            </form>
        </section>
    )

}
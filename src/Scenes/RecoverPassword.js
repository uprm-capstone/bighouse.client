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
        <section class='RecPassSection'>
    
            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p> 
    
            <h1 class="h1Gray">Recover Password</h1>
    
            <form class="loginForm">
    
                <label class='inputTitle' htmlFor="Email">Email</label> 

                <input class="inputRecEmail"
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
                        Log In
                        <span className="line">
                            <a href='#'></a>
                        </span>
                    </p>
        
            </form>
        </section>
    )

}
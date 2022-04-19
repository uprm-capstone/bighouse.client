import React from 'react';
import axios from 'axios'; 
import PaymentHistory from '../Components/Tests/PaymentHistoryScene.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Nav from '../Components/Sections/Nav.js'; 

export default function PaymentHistory(){

        
    const [history, setDocument] = useState(PaymentHistory.payment)



/*Axios*/

    const functionHandler = () => {
      
    }

    return(
        <section class="paymentHistorySection"> 
        
        <Nav />
        <h1 class="documentHeader"> Payment History </h1>

        {history.map(history => (
        <div class="payment">
            <label class="blockTitle"> Created on {history.creation}</label> <br />
            <label class="blockInfo"> {history.title} </label> <br />
            <Button name="More" onClick={functionHandler} class="moreButton" />
        </div>
        ))}

        </section>
    )
}



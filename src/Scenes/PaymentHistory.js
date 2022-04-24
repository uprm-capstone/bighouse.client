import React from 'react';
import axios from 'axios'; 
import PaymentHistoryScene from '../Components/Tests/PaymentHistoryScene.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Nav from '../Components/Sections/Nav.js'; 

export default function PaymentHistory(){
     
    const [payment, setPayments] = useState(PaymentHistoryScene.payment)

/*Axios*/

    const functionHandler = () => {

    }

    return(

        <section class="paymentHistorySection"> 
        
        <div> <Nav /> </div>
        <h1 class="paymentHistoryHeader"> Payment History </h1>
        <h1 class="paymentHeader"> Payments </h1>

        {payment.map(payment => (
        <div class="payment">
            <label class="blockTitle"> Payment sent on {payment.creation}</label> <br />
            <label class="blockInfo"> ${payment.total} </label>
            <Button name="More" onClick={functionHandler} class="morePayment" /> 
           
        </div>
        ))}

        </section>
    )
}



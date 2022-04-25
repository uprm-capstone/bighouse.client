import React from 'react';
import PaymentHistoryScene from '../Components/Tests/PaymentHistoryScene.json'; 
import {useState} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';


export default function PaymentHistory(){
     
    const [payment, setPayments] = useState(PaymentHistoryScene.payment)

/*Axios*/


    return(

        <section class="viewPaymentSection"> 
        
        <div> X BUTTON </div>
        <h1 class="paymentHistoryHeader"> Payment </h1>
  

        {payment.map(payment => (
        <div class="viewPayment">
            <div class="payment">
            <label class="blockTitle"> Payment sent on {payment.creation}</label> <br />
            <label class="blockInfo"> ${payment.total} </label>
            </div>
            <Button name="Download Receipt" class="downloadReceipt"/>   
       </div>
        ))}

        </section>
    )
}



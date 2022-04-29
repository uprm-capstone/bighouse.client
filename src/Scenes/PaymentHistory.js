import React from 'react';
import PaymentHistoryScene from '../Components/Tests/PaymentHistoryScene.json'; 
import ViewPayment from '../Scenes/ViewPayment.js';
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import axios from 'axios';
import Nav from '../Components/Sections/Nav.js'; 

export default function PaymentHistory(){
     
    const [payment, setPayments] = useState(PaymentHistoryScene.payment)

/*Axios*/
    const handleToggle = (e) => {
        console.log("CLICKED")
        console.log(e);

        localStorage.setItem('view', e.payment_id);
        window.location.href = window.location.origin+'/View-Payment';

    }

  const showPayments = () => {
      if(payment){
        return payment.map(payment => (
            <div class="payment">
                <label class="blockTitle"> Payment sent on {payment.payment_date}</label> <br />
                <div class="subBlock"> 
                <label class="blockInfo"> ${payment.total} </label>
                <button onClick={() => handleToggle(payment)} className="morePayment">More</button>
                {/* <Button name="More" onClick={handleToggle(payment)} class="morePayment" />    */}
                </div>
            </div>
            ));
      }
      else{
          return (<div class="payment">
          <label class="blockTitle"> Payment sent on N/A</label> <br />
          <div class="subBlock"> 
          <label class="blockInfo"> No data to show </label>
          </div>
      </div>)
      }
  }

  const goHome =() =>{
    window.location.href = window.location.origin+'/Home'
  }

  useEffect(() => {

    // Validates user's token. If not valid, logs him/her out.
    axios({
        method: 'GET',
        params: {token:localStorage.getItem('Token')},
        url: process.env.REACT_APP_BASE_URL+`/validate`
    })
    .then(res => {
        console.log("TOKEN RES: "+res);
        console.log(res);

        if(!res.data){

            console.log("GOT THE ERROR");
            localStorage.removeItem('User');
            localStorage.removeItem('Apartment');
            localStorage.removeItem('Token');
        
            window.location.href = window.location.origin+'/Login';
            return;

        }
    })
    .catch((error) => {
        console.log(error);
    });

    axios({
        method: 'GET',
        params: {user_id:localStorage.getItem('User')},
        url: process.env.REACT_APP_BASE_URL+`/payments/get-payments-user`
    })
    .then(res => {
        setPayments(res.data);
    })
    .catch((error) => {
        console.log(error);
    })

    }, []);

    return(

        <section class="paymentHistorySection"> 
        
             <Nav />
            <h1 class="paymentHistoryHeader"> Payment History </h1>
            <h1 class="paymentHeader"> Payments </h1>

            {showPayments()}
            

        </section>
    )
}



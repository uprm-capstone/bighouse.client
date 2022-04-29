import React, { useEffect } from 'react';
import {useState} from 'react';
import ViewPaymentScene from '../Components/Tests/ViewPaymentScene.json'; 
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Xbutton from '../Components/Buttons/Xbutton.js';
import axios from 'axios';
import Nav from '../Components/Sections/Nav';


export default function ViewPayment(){
     

    const [user, setUser] = useState(ViewPaymentScene.user)
    const [receipt, setReceipt] = useState(ViewPaymentScene.receipt)
    const [landlord, setLandlord] = useState(ViewPaymentScene.landlord)
    const [apartment, setApartment] = useState(ViewPaymentScene.apartment)
    const [payment, setPayment] = useState(ViewPaymentScene.apartment)
    const [utilities, setUtilities] = useState()


    const handleUtilities = () => {
        if(utilities){
            // console.log(utilities);
            return utilities.map(utility => (
                <div class="utility">
                    <div class="subBlock"> 
                    <label class="viewPaymentData"> {utility.utility_name} </label>
                    <label class="viewBalanceData">${(utility.cost_per_unit*utility.unit_quantity).toFixed(2)}</label>
                    </div>
                </div>
                ));
        }
        else{
            return;
        }
    }

    const clicking =()=>{
        console.log("Clicking");
    }

/*Axios*/
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

        // If no data then user data is removed and logs out.
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

    // Gets payment data
    axios({
        method: 'GET',
        params: {payment_id:localStorage.getItem('view')},
        url: process.env.REACT_APP_BASE_URL+`/payments/get-payment`
    })
    .then(res => {
        setPayment(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Gets apartment data.
    axios({
        method: 'GET',
        params: {apartment_id:localStorage.getItem('Apartment')},
        url: process.env.REACT_APP_BASE_URL+`/apartments/apartment`
    })
    .then(res => {
        setApartment(res.data);
    })
    .catch((error) => {
        console.log(error);
    })

    // Gets apartment utilities.
    axios({
        method: 'GET',
        params: {apartment_id:localStorage.getItem('Apartment')},
        url: process.env.REACT_APP_BASE_URL+`/utility/get-apartment-utilities`
    })
    .then(res => {
        setUtilities(res.data);
    })
    .catch((error) => {
        console.log(error);
    })

},[])

    return(

        <section class="viewPaymentSection"> 
        <div> <Nav /> </div>
        <h1 class="paymentHistoryHeader"> Payment </h1>
        
     
        <div class="viewPayment">
            <div class="aptLandlordBlock">
            <label class="blockTitle"> Landlord:  {landlord.firstName} {landlord.lastName} </label> <br />
            <label class="blockInfo"> Apartment: {apartment.apartment_number} </label>
            </div>

            <div class="viewPaymentRent"> Rent ${apartment.apartment_cost} </div> <br />
            {/* <div class="viewPaymentData"> Parking ${receipt.parking} </div><br /> */}
            <div class="viewPaymentData"> Utilities ${parseFloat(payment.utility_cost).toFixed(2)} </div><br />
            {/* {handleUtilities()}<br/> */}

            <div class="line"> </div>

            <div class="viewPaymentTotal"> Total ${payment.total} </div><br />
            {/* <div class="cardBlock"> Ending in: ...{receipt.cardNumber} {receipt.card} </div> */}

            <div class="paymentSentDate"> Payment sent on {payment.payment_date} </ div> 


            {/* <Button name="Download Receipt" class="downloadReceiptButton"/>   */}
            <button onClick={clicking}>Download Receipt</button>
       </div>
    </section>
    )
}



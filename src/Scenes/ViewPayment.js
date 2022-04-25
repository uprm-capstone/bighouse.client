import React from 'react';
import {useState} from 'react';
import ViewPaymentScene from '../Components/Tests/ViewPaymentScene.json'; 
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Xbutton from '../Components/Buttons/Xbutton.js';


export default function ViewPayment(){
     

    const [user, setUser] = useState(ViewPaymentScene.user)
    const [receipt, setReceipt] = useState(ViewPaymentScene.receipt)
    const [landlord, setLandlord] = useState(ViewPaymentScene.landlord)
    const [apartment, setApartment] = useState(ViewPaymentScene.apartment)

/*Axios*/

    return(

        <section class="viewPaymentSection"> 
        
        <div> <Xbutton /> </div>
        <h1 class="paymentHistoryHeader"> Payment </h1>
        
     
        <div class="viewPayment">
            <div class="aptLandlordBlock">
            <label class="blockTitle"> Landlord:  {landlord.firstName} {landlord.lastName} </label> <br />
            <label class="blockInfo"> {apartment.address} </label>
            </div>

            <div class="viewPaymentRent"> Rent ${receipt.rent} </div> <br />
            <div class="viewPaymentData"> Parking ${receipt.parking} </div><br />
            <div class="viewPaymentData"> Utilities ${receipt.utilities} </div><br />

            <div class="line"> </div>

            <div class="viewPaymentTotal"> Total ${receipt.total} </div><br />
            <div class="cardBlock"> Ending in: ...{receipt.cardNumber} {receipt.card} </div>

            <div class="paymentSentDate"> Payment sent on {receipt.creation} </ div> 


            <Button name="Download Receipt" class="downloadReceiptButton"/>  
       </div>
    </section>
    )
}



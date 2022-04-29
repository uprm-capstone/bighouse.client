import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState, useRef, useEffect } from 'react'
import Nav from "../Components/Sections/Nav";
import ViewPaymentScene from '../Components/Tests/ViewPaymentScene.json'; 

// Gives styling to the card field.
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
            iconColor: "#c4f0ff",
			color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
            color: "#32325d"
            }
		},
		invalid: {
			fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
		}
	}
}


export default function PaymentForm() {

    const [user, setUser] = useState(ViewPaymentScene.user)
    const [receipt, setReceipt] = useState(ViewPaymentScene.receipt)
    const [landlord, setLandlord] = useState(ViewPaymentScene.landlord)
    const [apartment, setApartment] = useState(ViewPaymentScene.apartment)
    const [payment, setPayment] = useState(ViewPaymentScene.apartment)
    const [utilities, setUtilities] = useState()

    const userRef = useRef();
    const errRef = useRef(); 

    const currentDate = new Date();

    const [errorMessage, setErrorMessage] = useState('');

    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validates user's token. If not valid, logs him/her out.
        axios({
            method: 'GET',
            params: {token:localStorage.getItem('Token')},
            url: process.env.REACT_APP_BASE_URL+`/validate`
        })
        .then(res => {
            console.log("TOKEN RES: "+res);
            console.log(res);

            // If no data the user data is removed and logs out.
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

        // Prepares to carry out payment by gathering proper data.
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if(!error) {
            try {
                const {id} = paymentMethod
                // Makes payment with the stripe checkout PCI compliant service and adds payment info to data base.
                const response = await axios.post(process.env.REACT_APP_BASE_URL+"/payments/create-payment", {
                    amount: (localStorage.getItem('Pay')*100),
                    id,
                    user_id: localStorage.getItem('User'),
                    payment_date: currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate(),
                    total: localStorage.getItem('Pay'),
                    utility_cost: localStorage.getItem('uCost'),
                    apartment_cost: localStorage.getItem('aCost')
                })

                console.log(response);
                
                window.location.href = window.location.origin + '/Home';

            } 
            catch (error) {
                console.log("Error", error);
            }
        } 
        else {
            console.log(error.message);
        }
}

// Handles the proper display of the different utilities to pay and their balance.
const handleUtilities = () => {
    if(utilities){
        return utilities.map(utility => (
            <div class="utility">
                <div class="subBlock"> 
                <label class="viewPaymentData"> {utility.utility_name} </label>
                <label class="viewBalanceData">${(utility.cost_per_unit*utility.unit_quantity).toFixed(2)}</label>
                </div>

                {/* <div class="viewPaymentData"> {utility.utility_name} ${(utility.cost_per_unit*utility.unit_quantity).toFixed(2)} </div><br /> */}
            </div>
            ));
    }
    else{
        return;
    }
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

        if(!res.data){

            console.log("GOT THE ERROR");
            localStorage.removeItem('User');
            localStorage.removeItem('Apartment');
            localStorage.removeItem('Token');
        
            window.location.href = window.location.origin+'/Login';
            return;

        }
        else{
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
        }
    })
    .catch((error) => {
        console.log(error);
    })
    
},[])

    return (

    <>

        <section class="viewPaymentSection"> 
        <div> <Nav /> </div>
        <h1 class="paymentHistoryHeader"> Payment </h1>
        
     
        <div class="viewPayment">
            <div class="aptLandlordBlock">
            <label class="blockTitle"> Landlord:  {landlord.firstName} {landlord.lastName} </label> <br />
            <label class="blockInfo"> Apartment: {apartment.apartment_number} </label>
            </div>

            <div class="viewPaymentRent"> Rent ${apartment.apartment_cost} </div> <br />

            {handleUtilities()}<br/>

            <div class="line"> </div>

            <div class="viewPaymentTotal"> Total ${parseFloat(parseFloat(apartment.apartment_cost)+parseFloat(localStorage.getItem('uCost'))).toFixed(2)} </div><br />

            <form class="signupForm" onSubmit={handleSubmit}> 

                <fieldset className="card-Field">
                {/* <div className="FormRow"> */}
                    <CardElement options={CARD_OPTIONS} id="card-element" autoComplete='off'/>
                {/* </div> */}
                </fieldset>
                <br/>

                <button>Pay</button>
            
            </form>


       </div>
    </section>

        </>
    )
}
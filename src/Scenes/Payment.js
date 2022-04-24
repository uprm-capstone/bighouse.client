import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState, useRef, useEffect } from 'react'
import Nav from "../Components/Sections/Nav";

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
    const userRef = useRef();
    const errRef = useRef(); 

    const currentDate = new Date();

    const [errorMessage, setErrorMessage] = useState('');

    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:8008/payments/create-payment", {
                amount: (localStorage.getItem('Pay')*100),
                id,
                user_id: localStorage.getItem('User'),
                payment_date: currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate(),
                total: localStorage.getItem('Pay'),
                utility_cost: localStorage.getItem('uCost'),
                apartment_cost: localStorage.getItem('aCost')
            })

            // if(response.data.success) {
            //     console.log("Successful payment")
            // }
            console.log(response);
            
            window.location.href = window.location.origin + '/Home';

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (

    <>
    
    <div><Nav/></div>
        <section class="signupSection">

            

            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

            <h1 class="h1Gray">Payment</h1>

        <form class="signupForm" onSubmit={handleSubmit}> 

                <fieldset className="card-Field">
                {/* <div className="FormRow"> */}
                    <CardElement options={CARD_OPTIONS} id="card-element" autoComplete='off'/>
                {/* </div> */}
            </fieldset>
            <br/>

            <button>Pay</button>
                   
            </form>
        </section>
        </>
    )
}
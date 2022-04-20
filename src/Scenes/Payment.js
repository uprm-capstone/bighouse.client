import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState, useRef } from 'react'
import Nav from "../Components/Sections/Nav";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const userRef = useRef();
    const errRef = useRef(); 

    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [name, setName] = useState('');
    const [number, setNumber] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [cv,setCV] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment", {
                amount: (localStorage.getItem('Pay')*100),
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
                setLoading(false)
            }

        } catch (error) {
            console.log("Error", error)
            setLoading(false)
        }
    } else {
        console.log(error.message)
    }
}

    return (
    //     <>
    //     {!success ? 
    //     <form onSubmit={handleSubmit}>
    //         <fieldset className="FormGroup">
    //             <div className="FormRow">
    //                 <CardElement options={CARD_OPTIONS}/>
    //             </div>
    //         </fieldset>
    //         <button>Pay</button>
    //     </form>
    //     :
    //    <div>
    //        <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
    //    </div> 
    //     }
            
    //     </>

    <>
        <section class="signupSection">

            <Nav/>

            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

            <h1 class="h1Gray">Carry out payment</h1>

        <form class="signupForm" onSubmit={handleSubmit}> 

            <label  class="inputTitle" htmlFor="firstName"> 
               Card Holder
                </label>
                <input 
                    type="text"
                    id="firstName"
                    placeholder = "Enter full name"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    />

                    <label class="inputTitle" htmlFor="lastName"> 
                        Card Number 
                </label>
                <input 
                    type="number"
                    id="number"
                    placeholder = "Enter card number"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setNumber(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    />

                    <label class="inputTitle" htmlFor="dateOfBirth"> 
                        Expiration month
                </label>
                <input 
                    type="number"
                    id="month"
                    placeholder = "MM"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setMonth(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    />

                <label class="inputTitle" htmlFor="dateOfBirth"> 
                        Expiration year
                </label>
                <input 
                    type="number"
                    id="month"
                    placeholder = "YYYY"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setYear(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    />
                

                    <label class="inputTitle" htmlFor="password">
                            CVV
                        </label>

                    <input
                            type="password"
                            id="password"
                            placeholder = "CVV"
                            onChange={(e) => setCV(e.target.value)}
                            value={cv}
                            required
                            aria-describedby="passworddnote"

                        />

            <button>Pay</button>
                   
            </form>
        </section>
        </>
    )
}
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "../Scenes/Payment"

const PUBLIC_KEY = "pk_test_51Kqi0nFr0VP7xWNUpj8kh0LoJpIRAzRprP5zeQ1ekLsALe2T3RmQMhEEbYawBOI78Td8jr1GE7iToXHN0sTVTGyr00o6lhO7Y4"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
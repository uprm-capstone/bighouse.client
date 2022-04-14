import React from 'react';
import axios from 'axios'; 
import User from '../Components/Tests/User.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Nav from '../Components/Sections/Nav.js'; 

export default function Home(){

    /*Test User*/
    const [user, setUser] = useState(User.user)
    const [document, setDocument] = useState(User.document)
    const [apartmentCost, setApartmentCost] = useState('')
    const [issue, setIssue] = useState(User.issue) 
    const [utility, setUtility] = useState(User.utility)
    const [utilityCost, setUtilityCost] = useState('')
    const [totalCost, setTotalCost] = useState(apartmentCost+utilityCost)



/*Axios for name, payment info, utilities info, etc. */

    // const api = axios.create({
    //     baseURL: 'http://localhost:8008/'
    //  })

    // /*Get User*/
    // api.get('users/user').then(res => {
    //       setUser(res)
    // })

    // /*Get Payment Balance MISSING PAYMENT DUE DATE, AND REPORTED ON DATE*/
    // api.get('apartments/apartment-cost').then(res => {
    //     setApartmentCost(res)
    // })

    // /*Get Issues*/
    // api.get('issues/').then(res => {
    //     setIssue(res)
    // })

    // /*Get Utility*/
    // api.get('utility/get-apartment-utilities').then(res => {
    //     setUtility(res)
    // })

    // /*Get Utility Cost*/
    // api.get('utility/get-utility-total').then(res => {
    //     setUtilityCost(res)
    // })


    // /*Get Documents*/
    // api.get('documents/').then(res => {
    //     setDocument(res)
    // })

    useEffect(() => {
        console.log("Entered UseEffect:")
        const apartment = {
            apartment_id:3
        };
        // axios.get(`http://localhost:8008/apartments/apartment-total-cost`, apartment)
        // .then(res => {
        //     console.log("RESULT:")
        //     console.log(res);
        //     setApartmentCost(res)
        //     console.log(apartmentCost)
        // })
        // .catch((error) => {
        //     console.log(error);
        // })

        axios({
            method: 'GET',
            params: apartment,
            url: `http://localhost:8008/apartments/apartment-total-cost`
        })
        .then(res => {
                console.log("RESULT:")
                console.log(res.data.apartment_cost);
                setApartmentCost(res.data.apartment_cost)
                console.log(apartmentCost)
            })
            .catch((error) => {
                console.log(error);
            })
            axios({
                method: 'GET',
                params: apartment,
                url: `http://localhost:8008/utility/get-utility-total`
            })
            .then(res => {
                    console.log("RESULT:")
                    console.log(res.data.total_cost);
                    setUtilityCost(res.data.total_cost)
                    console.log(apartmentCost)
                })
                .catch((error) => {
                    console.log(error);
                })
            var holder = parseFloat(apartmentCost+utilityCost).toFixed(2);
            console.log("TOTAL COST: "+holder);
            setTotalCost(holder);
    })

    return(
        <section class="HomeSection"> 
        
        <Nav />
        <h1 class="homeGray">Hi {user.firstName}!</h1>
        <p class="homeGray"> Your next payment is scheduled for {user.paymentDueDate} </p>


        <div class="paymentBalanceBlock">
            <label class="balanceTitle"> Unpaid Balance </ label> <br />
            <label class="balanceAmount"> {totalCost} </ label> <br />
            <label class="balanceReport"> reported on {user.paymentReportDate} </label>         
        </div> 

        <div class="utilitiesBalanceBlock">
            <label class="blockTitle"> Utilities Balance</label> <br />
            <div className="subBlock"> 
            <label class="blockInfo"> {parseFloat(utilityCost).toFixed(2)} </label>
            <label class="balanceMarker">{utility.utilityBalanceMarker}</label>
            </div>
        </div>

        <div class="documentsBlock">
            <label class="blockTitle"> Last Payment {document.documentReportDate}</label> <br />
            <div className="subBlock" > 
            <label class="blockInfo"> {document.documentInfo} </label>
            <Button name="More" class="moreButton" />
            </div>
        </div>


        {/*Issues need to be added dynamically in a list */}

        <h1 class="h1Gray"> Recent Issues</h1>

        {/* {issue.map(issue => (
        <div class="issuesBlock">
    
            <label class="blockTitle"> Opened on {issue.issueReportDate} </label> <br />

            <div class="subBlock"> 
            <label class="blockInfo"> {issue.issueTitle} </label>
            <label class="statusMarker">{issue.issueStatusMarker}</label>
            </div>
        </div>

        ))} */}

        <p class="viewMore"> 
            <span className="line">
            <a href='#'>View More...</a> 
            </span> 
        </p>
        </section>
    )
}



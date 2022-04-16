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
    const [userName, setUserName] = useState('')
    const [document, setDocument] = useState(User.document)
    const [apartmentCost, setApartmentCost] = useState('')
    const [issue, setIssue] = useState(User.issue) 
    const [utility, setUtility] = useState(User.utility)
    const [utilityCost, setUtilityCost] = useState('')
    const [totalCost, setTotalCost] = useState(apartmentCost+utilityCost)
    const [lastPayment, setLastPayment] = useState(0)
    const [balanaceComp, setBalanaceComp] = useState(0)
    const [balance, setBalannce] = useState('')

    const [year, setYear] = useState(new Date().getFullYear())

    const nMonth=()=>{
        let holder = new Date().getMonth();
        if(holder>=12){
            setYear(new Date().getFullYear()+1);
            console.log(year);
            return 1;
        }
        else{
            console.log(year);
            return new Date().getMonth()+2;
        }
    }

    const [month, setMonth] = useState(nMonth)
    

    


    useEffect(() => {
        console.log("Entered UseEffect:")
        const apartment = {
            apartment_id:3
        };

        // Gets user name
        axios({
            method: 'GET',
            params: {user_id:3},
            url: `http://localhost:8008/users/user`
        })
        .then(res => {
                console.log("PAYMENT:")
                console.log(res.data);
                setUserName(res.data.user_name);
            })
            .catch((error) => {
                console.log(error);
            })

        //Gets apartment cost
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

            //Gets utility cost
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

            // Get payment data
            axios({
                method: 'GET',
                params: {user_id:3},
                url: `http://localhost:8008/payments/get-payment-user`
            })
            .then(res => {
                    console.log("PAYMENT:")
                    console.log(res.data);
                    setLastPayment(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })

            if(parseFloat(parseFloat(utilityCost)/parseFloat(lastPayment))>1){
                setBalanaceComp(parseFloat(parseFloat(utilityCost)/parseFloat(lastPayment.utility_cost))-1);
                console.log("Balance is: "+balanaceComp);
                setBalannce("statusMarker");
            }
            else{
                setBalanaceComp(parseFloat(1-parseFloat(utilityCost)/parseFloat(lastPayment.utility_cost)));
                console.log("Balance is: "+balanaceComp);
                setBalannce("balanceMarker");
            }


    })

    return(
        <section class="HomeSection"> 
        <Nav />
        <h1 class="homeGray">Hi {userName}!</h1>
        <p class="homeGray"> Your next payment is scheduled for {month}/1/{year} </p>


        <div class="paymentBalanceBlock">
            <label class="balanceTitle"> Unpaid Balance </ label> <br />
            <label class="balanceAmount"> {totalCost} </ label> <br />
            <label class="balanceReport"> reported on {user.paymentReportDate} </label>         
        </div> 

        <div class="utilitiesBalanceBlock">
            <label class="blockTitle"> Utilities Balance</label> <br />
            <div className="subBlock"> 
            <label class="blockInfo"> {parseFloat(utilityCost).toFixed(2)} </label>
            <label class={balance}>{balanaceComp.toFixed(2)+"^"}</label>
            </div>
        </div>

        <div class="documentsBlock">
            <label class="blockTitle"> Last Payment {lastPayment.payment_date}</label> <br />
            <div className="subBlock" > 
            <label class="blockInfo"> ${lastPayment.total} </label>
            <Button name="More" class="moreButton" />
            </div>
        </div>


        {/*Issues need to be added dynamically in a list */}

        <h1 class="h1Gray"> Recent Issues</h1>

        {issue.map(issue => (
        <div class="issuesBlock">
    
            <label class="blockTitle"> Opened on {issue.issueReportDate} </label> <br />

            <div class="subBlock"> 
            <label class="blockInfo"> {issue.issueTitle} </label>
            <label class="statusMarker">{issue.issueStatusMarker}</label>
            </div>
        </div>

        ))}

        <p class="viewMore"> 
            <span className="line">
            <a href='#'>View More...</a> 
            </span> 
        </p>
        </section>
    )
}



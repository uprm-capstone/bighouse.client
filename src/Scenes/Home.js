import React from 'react';
import axios from 'axios'; 
import User from '../Components/Tests/User.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Nav from '../Components/Sections/Nav.js'; 

export default function Home(){

    /*Test User*/
    const [user, setUser] = useState(User.user);
    const [userName, setUserName] = useState('');
    const [document, setDocument] = useState(User.document);
    const [apartmentCost, setApartmentCost] = useState('');
    const [issue, setIssue] = useState(User.issue) ;
    const [utility, setUtility] = useState(User.utility);
    const [utilityCost, setUtilityCost] = useState('');
    const [totalCost, setTotalCost] = useState(apartmentCost+utilityCost);
    const [lastPayment, setLastPayment] = useState(0);
    const [balanaceComp, setBalanaceComp] = useState(0);
    const [balance, setBalannce] = useState('');

    const [year, setYear] = useState(new Date().getFullYear())

    const nMonth=()=>{
        let holder = new Date().getMonth();
        if(holder>=12){
            setYear(new Date().getFullYear()+1);
            return 1;
        }
        else{
            return new Date().getMonth()+2;
        }
    }

    const [month, setMonth] = useState(nMonth)
    

    const issueStatus = (status) =>{
        if(status){
            return 'open';
        }
        else{
            return 'closed';
        }
    }
    


    useEffect(() => {
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
            setApartmentCost(res.data.apartment_cost);
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
            setUtilityCost(res.data.total_cost);
            const holder = parseFloat(apartmentCost+utilityCost).toFixed(2);
            setTotalCost(holder);
        })
        .catch((error) => {
            console.log(error);
        })

        // Get payment data
        axios({
            method: 'GET',
            params: {user_id:3},
            url: `http://localhost:8008/payments/get-payment-user`
        })
        .then(res => {
                setLastPayment(res.data);
                if(parseFloat(parseFloat(utilityCost)/parseFloat(lastPayment))>1){
                    setBalanaceComp(parseFloat(parseFloat(utilityCost)/parseFloat(lastPayment.utility_cost))-1);
                    setBalannce("statusMarker");
                }
                else{
                    setBalanaceComp(parseFloat(1-parseFloat(utilityCost)/parseFloat(lastPayment.utility_cost)));
                    setBalannce("balanceMarker");
                }
                console.log("Utility cost is: "+utilityCost+"\nLast payment is: "+lastPayment);
                console.log("THE RESULT IS:"+ balanaceComp);
            })
            .catch((error) => {
                console.log(error);
            })

        // Get Issues data
        axios({
            method: 'GET',
            params: {apartment_id:3},
            url: `http://localhost:8008/issues/get-apartment-issues`
        })
        .then(res => {
                setIssue(res.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [totalCost,balanaceComp]);

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
    
            <label class="blockTitle"> Opened on {issue.date_created} </label> <br />

            <div class="subBlock"> 
            <label class="blockInfo"> {issue.title} </label>
            <label class="statusMarker">{issueStatus(issue.status)}</label>
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



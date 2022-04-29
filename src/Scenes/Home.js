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
    const [issue, setIssue] = useState() ;
    const [utility, setUtility] = useState(User.utility);
    const [utilityCost, setUtilityCost] = useState('');
    const [totalCost, setTotalCost] = useState(apartmentCost+utilityCost);
    const [lastPayment, setLastPayment] = useState(0);
    const [balanaceComp, setBalanaceComp] = useState(0);
    const [balance, setBalance] = useState('');

    const [year, setYear] = useState(new Date().getFullYear())

    // Returns next month due payment.
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

    const [month, setMonth] = useState(nMonth);

    // If user has no allocated apartment message changes to a proper one.
    const homeMessage = () =>{
        if(localStorage.getItem('Apartment')){
            return ("Your next payment is scheduled for "+month+"/1/"+year) 
        }
        else{
            return "No apartment has been appointed at this moment"
        }
    }

    const handleToggle = (e) => {
        console.log("CLICKED")
        console.log(e);

        localStorage.setItem('view', e.payment_id);
        window.location.href = window.location.origin+'/View-Payment';

    }
    
    // If there is a total cost to be paid returns it. If there is non, then returns 0.00.
    const unpaidBalance = () =>{
        if(totalCost){
            return totalCost;
        }
        else{
            return '0.00';
        }
    }

    // Returns the proper status to the issue in question.
    const issueStatus = (status) =>{
        if(!status){
            return 'pending';
        }
        else{
            return 'solved';
        }
    }
    
    // Returns green or red based on the issue status
    const issuesCheck = (e) =>{
        if(e){
            return "balanceMarker";
        }
        else{
            return "statusMarker";
        }
    }

    // Returns the proper utility balance. If there is no utility balance then a proper message is sent.
    const currentUBalance = () =>{
        if(utilityCost){
            return parseFloat(utilityCost).toFixed(2);
        }
        else{
            return "No available balance";
        }
    }

    // Provides the % being saved of paid over in comparison to last utility balance payment made.
    const showBalance = () =>{
        if(balanaceComp){
            return balanaceComp+"%";
        }
        else{
            return "N/A";
        }
    }

    // Displays last payment made. If no payment to be reported like for example a newly created account a proper message is displayed.
    const displayLastPayment = () =>{
        if(lastPayment.total){
            return ("$"+lastPayment.total);
        }
        else{
            return "No payment data to show";
        }
    }

    // If there is a last payment then the more button is displayed.
    const moreButton = () => {
        if(lastPayment.total){
            return (<Button name="More" class="moreButton" />)
        }
        else{
            return;
        }
    }

    // If there are issues to be displayed, the 4 most recent issues are displayed. If there is non then a proper message is displayed.
    const issueChecker = () => {
        if(issue){
            let counter = 0;
            return issue.map(issue => (counter++<4)?(
                <div class="issuesBlock">
            
                    <label class="blockTitle"> Opened on {issue.date_created} </label> <br />
        
                    <div class="subBlock"> 
                    <label class="blockInfo"> {issue.title} </label>
                    <label class={issuesCheck(issue.status)}>{issueStatus(issue.status)}</label>
                    </div>
                </div>
                ):null);
        }
        else{
            return (<div class="issuesBlock">
            
                    <label class="blockTitle"> </label> <br />
        
                    <div class="subBlock"> 
                    <label class="blockInfo"> No issue to display </label>
                    <label class="balanceMarker">N/A</label>
                    </div>
                </div>)
        }
    }

    useEffect(() => {
        if(localStorage.getItem('Token')==null){
            window.location.href = window.location.origin+'/Login';
        }

        // Validates user's token. If not valid, logs him/her out.
        axios({
            method: 'GET',
            params: {token:localStorage.getItem('Token')},
            url: process.env.REACT_APP_BASE_URL+`/validate`
        })
        .then(res => {

            // If there is no data then user data is removed and logs out.
            if(!res.data){

                localStorage.removeItem('User');
                localStorage.removeItem('Apartment');
                localStorage.removeItem('Token');
            
                window.location.href = window.location.origin+'/Login';
                return;

            }
            
            // Gets user name
            axios({
                method: 'GET',
                params: {user_id:localStorage.getItem('User')},
                url: process.env.REACT_APP_BASE_URL+`/users/user`
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
                params: {apartment_id: localStorage.getItem('Apartment')},
                url: process.env.REACT_APP_BASE_URL+`/apartments/apartment-total-cost`
            })
            .then(res => {
                setApartmentCost(res.data.apartment_cost);
                localStorage.setItem('aCost', apartmentCost);
            })
            .catch((error) => {
                console.log(error);
            })

            //Gets utility cost
            axios({
                method: 'GET',
                params: {apartment_id: localStorage.getItem('Apartment')},
                url: process.env.REACT_APP_BASE_URL+`/utility/get-utility-total`
            })
            .then(res => {
                setUtilityCost(res.data.total_cost);
                localStorage.setItem('uCost', utilityCost);
                const holder = parseFloat(apartmentCost+utilityCost).toFixed(2);
                setTotalCost(holder);
                localStorage.setItem('Pay',totalCost);
            })
            .catch((error) => {
                console.log(error);
            })

            // Get payment data
            axios({
                method: 'GET',
                params: {user_id:localStorage.getItem('User')},
                url: process.env.REACT_APP_BASE_URL+`/payments/get-payment-user`
            })
            .then(res => {
                    setLastPayment(res.data);
                    if(utilityCost){
                        if(parseFloat(parseFloat(utilityCost)/parseFloat(lastPayment.utility_cost))>1){
                            setBalanaceComp("⌃"+((parseFloat(parseFloat(utilityCost)/parseFloat(lastPayment.utility_cost))-1)*100).toFixed(0));
                            setBalance("statusMarker");
                        }
                        else{
                            setBalanaceComp("⌃"+(parseFloat((1-parseFloat(utilityCost)/parseFloat(lastPayment.utility_cost)))*100).toFixed(0));
                            setBalance("balanceMarker");
                        }
                    }
                    else{
                        setBalance("balanceMarker");
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                })

            // Get Issues data
            axios({
                method: 'GET',
                params: {apartment_id: localStorage.getItem('Apartment')},
                url: process.env.REACT_APP_BASE_URL+`/issues/get-apartment-issues`
            })
            .then(res => {
                // console.log("ISSUES FOR APARTMENT ARE: "+res);
                    setIssue(res.data);
            })
            .catch((error) => {
                console.log(error);
            })

        })
        .catch((error) => {
            console.log("ERROR:" + error);
        })

    }, [totalCost,balanaceComp]);

    return(
        <section class="HomeSection"> 
        <div><Nav/></div>
        <h1 class="homeGray">Hi {userName}!</h1>
        <p class="homeGray"> {homeMessage()} </p>


        <div class="paymentBalanceBlock">
            <label class="balanceTitle"> Unpaid Balance </ label> <br />
            <label class="balanceAmount"> {unpaidBalance()} </ label> <br />
            <label class="balanceReport"> reported on {lastPayment.payment_date} </label>         
        </div> 

        <div class="utilitiesBalanceBlock">
            <label class="blockTitle"> Utilities Balance</label> <br />
            <div className="subBlock"> 
            <label class="blockInfo"> {currentUBalance()} </label>
            <label class={balance}>{showBalance()}</label>
            </div>
        </div>

        {/* <div class="documentsBlock">
            <label class="blockTitle"> Last Payment {lastPayment.payment_date}</label> <br />
            <div className="subBlock" > 
            <label class="blockInfo"> {displayLastPayment()} </label>
            {moreButton()}
            </div>
        </div> */}

        <div class="documentsBlock">
                <label class="blockTitle"> Last Payment {lastPayment.payment_date}</label> <br />
                <div class="subBlock"> 
                <label class="blockInfo"> {displayLastPayment()} </label>
                <button onClick={() => handleToggle(lastPayment)} class="morePayment">More</button>
                {/* <Button name="More" onClick={handleToggle(payment)} class="morePayment" />    */}
                </div>
            </div>


        {/*Issues need to be added dynamically in a list */}

        <h1 class="h1Gray"> Recent Issues</h1>

        {issueChecker()}

        {/* {issue.map(issue => (
        <div class="issuesBlock">
    
            <label class="blockTitle"> Opened on {issue.date_created} </label> <br />

            <div class="subBlock"> 
            <label class="blockInfo"> {issue.title} </label>
            <label class={issuesCheck(issue.status)}>{issueStatus(issue.status)}</label>
            </div>
        </div>

        ))} */}

        <p class="viewMore"> 
            <span className="line">
            <a href={window.location.origin+"/Issues"}>View More...</a> 
            </span> 
        </p>
        </section>
    )
}



import React from 'react';
import axios from 'axios'; 
import User from '../Components/Tests/User.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Nav from '../Components/Sections/Nav.js'; 

export default function Issues(){

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


    const moreButton = () => {
        if(lastPayment.total){
            return (<Button name="More" class="moreButton" />)
        }
        else{
            return;
        }
    }

    const issueUnsolved = () => {
        if(issue){
            console.log(issue);
            console.log("THERE ARE ISSUES");
            return issue.map(issue => !issue.status?(
                <div class="issuesBlock">
            
                    <label class="blockTitle"> Opened on {issue.date_created} </label> <br />
        
                    <div class="subBlock"> 
                    <label class="blockInfo"> {issue.title} </label>
                    <label class={issuesCheck(issue.status)}>{issueStatus(issue.status)}</label>
                    </div>
                </div>
                ):(null));
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

    const issueSolved = () => {
        if(issue){
            console.log(issue);
            console.log("THERE ARE ISSUES");
            return issue.map(issue => issue.status?(
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
            url: `http://localhost:8008/validate`
        })
        .then(res => {
            console.log("TOKEN RES: "+res);
            console.log(res);

            if(!res.data){

                console.log("ENTERED IF");

                console.log("GOT THE ERROR");
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
                params: {apartment_id: localStorage.getItem('Apartment')},
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
                params: {apartment_id: localStorage.getItem('Apartment')},
                url: `http://localhost:8008/utility/get-utility-total`
            })
            .then(res => {
                setUtilityCost(res.data.total_cost);
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
                url: `http://localhost:8008/payments/get-payment-user`
            })
            .then(res => {
                    setLastPayment(res.data);
                    if(utilityCost){
                        if(parseFloat(parseFloat(utilityCost)/parseFloat(lastPayment))>1){
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
                url: `http://localhost:8008/issues/get-apartment-issues`
            })
            .then(res => {
                console.log("ISSUES FOR APARTMENT ARE: "+res);
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
        <section class="issueSection"> 

        <Nav/>

        <h1 class="h1Gray"> Issues</h1>

        <label class='subTitle'>Unsolved issues</label> 

        {issueUnsolved()}

        <label class='subTitle'>Solved issues</label> 

        {issueSolved()}

        {/* {issue.map(issue => (
        <div class="issuesBlock">
    
            <label class="blockTitle"> Opened on {issue.date_created} </label> <br />

            <div class="subBlock"> 
            <label class="blockInfo"> {issue.title} </label>
            <label class={issuesCheck(issue.status)}>{issueStatus(issue.status)}</label>
            </div>
        </div>

        ))} */}

        <button className='reportButton'>Report new issue</button>
        </section>
    )
}



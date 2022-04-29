import React from 'react';
import axios from 'axios'; 
import { useState, useEffect} from 'react';
import '../Styles/index.css';
import Nav from '../Components/Sections/Nav.js'; 

export default function Issues(){

    // Holds apartment issues.
    const [issue, setIssue] = useState() ;

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


    // Manages display for unsolved issues. If there are no issues the a proper message is displayed.
    const issueUnsolved = () => {
        if(issue){
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

    // Manages display for solved issues. If there are no issues the a proper message is displayed.
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

    const handle = () => {
        // Validates user's token. If not valid, logs him/her out.
        axios({
            method: 'GET',
            params: {token:localStorage.getItem('Token')},
            url: process.env.REACT_APP_BASE_URL+`/validate`
        })
        .then(res => {
            
            // If no data then user data is removed and logs out.
            if(!res.data){

                console.log("GOT THE ERROR");
                localStorage.removeItem('User');
                localStorage.removeItem('Apartment');
                localStorage.removeItem('Token');
            
                window.location.href = window.location.origin+'/Login';
                return;

            }
            else{
                window.location.href = window.location.origin+'/New-Issue';
                return;
            }
            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        // If no Token (JWT) found then logs out.
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

            // If no data then user data is removed and logs out.
            if(!res.data){

                console.log("GOT THE ERROR");
                localStorage.removeItem('User');
                localStorage.removeItem('Apartment');
                localStorage.removeItem('Token');
            
                window.location.href = window.location.origin+'/Login';
                return;

            }

            // Gets Issues data
            axios({
                method: 'GET',
                params: {apartment_id: localStorage.getItem('Apartment')},
                url: process.env.REACT_APP_BASE_URL+`/issues/get-apartment-issues`
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

    }, []);

    return(
        <section class="issueSection"> 

        <div><Nav/></div>

        <h1 class="h1Gray"> Issues</h1>

        <label class='subTitle'>Unsolved issues</label> 

        {issueUnsolved()}

        <label class='subTitle'>Solved issues</label> 

        {issueSolved()}

        <button className='reportButton' onClick={handle}>Report new issue</button>
        </section>
    )
}



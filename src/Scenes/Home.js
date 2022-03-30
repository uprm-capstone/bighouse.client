import React from 'react';
import User from '../Components/Tests/User.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
/*import HamburgerMenu from './Components/Sections/HamburgerMenu.js'; */

export default function Home(){

    /*Test User*/
    const [user, setUser] = useState(User.user); 
    const [document, setDocument] = useState(User.document); 
    const [issue, setIssue] = useState(User.issue); 
    const [utility, setUtility] = useState(User.utility); 




 /*Axios for name, payment info, utilities info, etc. */

    return(
        <section class="HomeSection"> 
        
        {/*<HamburgerMenu />*/}
        <h1 class="homeGray">Hi {user.firstName}!</h1>
        <p class="homeGray"> Your next payment is scheduled for {user.paymentDueDate} </p>


        <div class="paymentBalanceBlock">
            <label class="balanceTitle"> Unpaid Balance </ label> <br />
            <label class="balanceAmount"> {user.paymentBalance} </ label> <br />
            <label class="balanceReport"> reported on {user.paymentReportDate} </label>         
        </div> 

        <div class="utilitiesBalanceBlock">
            <label class="blockTitle"> Utilities Balance</label> <br />
            <div className="subBlock"> 
            <label class="blockInfo"> {utility.utilityBalance} </label>
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



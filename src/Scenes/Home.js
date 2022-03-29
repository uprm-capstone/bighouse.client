import React from 'react';
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
/*import HamburgerMenu from './Components/Sections/HamburgerMenu.js'; */

export default function Home(){

 /*Axios for name, payment info, utilities info, etc. */

    return(
        <section class="HomeSection"> 
        
        {/*<HamburgerMenu />*/}

        <h1 class="homeGray">Hi "Blank"</h1>
        <p class="homeGray"> Your next payment is scheduled for "Blank" </p>


        <div class="paymentBalanceBlock">
            <label class="balanceTitle"> Unpaid Balance </ label> <br />
            <label class="balanceAmount"> ADD BALANCE HERE</ label> <br />
            <label class="balanceReport"> reported on "BLANK"</label>         
        </div> 

        <div class="utilitiesBalanceBlock">
            <label class="blockTitle"> Utilities Balance</label> <br />
            <div> 
            <label class="blockInfo"> ADD BALANCE HERE</label>
            <label class="balanceMarker">BALANCE MARKER</label>
            </div>
        </div>

        <div class="documentsBlock">
            <label class="blockTitle"> Last Payment "ADD DATE"</label> <br />
            <div > 
            <label class="blockInfo"> ADD BALANCE HERE</label>
            <Button name="More" class="moreButton" />
            </div>
        </div>


        {/*Issues need to be added dynamically in a list */}

        <h1 class="h1Gray"> Recent Issues</h1>

        <div class="issuesBlock">
            <label class="blockTitle"> Opened on "ADD DATE"</label> <br />
            <div> 
            <label class="blockInfo"> ISSUE TITLE HERE</label>
              <label class="statusMarker">STATUS MARKER</label>
            </div>
        </div>

        <div class="issuesBlock">
            <label class="blockTitle"> Opened on "ADD DATE"</label> <br />
            
            <div> 
            <label class="blockInfo"> ISSUE TITLE HERE</label>
            <label class="statusMarker">STATUS MARKER</label>
            </div>
        </div>

        <p class="viewMore"> 
            <span className="line">
            <a href='#'>View More...</a> 
            </span> 
        </p>
        </section>
    )
}



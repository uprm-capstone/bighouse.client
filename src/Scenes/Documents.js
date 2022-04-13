import React from 'react';
import axios from 'axios'; 
import User from '../Components/Tests/DocumentScene.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Nav from '../Components/Sections/Nav.js'; 

export default function Home(){

    /*Test User*/
    const [user, setUser] = useState(User.user)
    const [document, setDocument] = useState(User.document)



/*Axios for name, payment info, utilities info, etc. */

    const api = axios.create({
        baseURL: 'http://localhost:8008/'
     })

    /*Get User*/
    api.get('users/user').then(res => {
          setUser(res)
    })

    /*Get Documents*/
    api.get('documents/').then(res => {
        setDocument(res)
    })

    return(
        <section class="documentSection"> 
        
        <Nav />
        <h1 class="homeGray"> Documents </h1>

        {document.map(document => (
        <div class="documentsBlock">
            <label class="blockTitle"> TEMP {document.documentReportDate}</label> <br />
            <div className="subBlock" > 
            <label class="blockInfo"> {document.documentInfo} </label>
            <Button name= {document.function} class="moreButton" />
            </div>
        </div>
        ))}

        </section>
    )
}



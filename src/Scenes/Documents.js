import React from 'react';
import axios from 'axios'; 
import Document from '../Components/Tests/DocumentScene.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Nav from '../Components/Sections/Nav.js'; 

export default function Documents(){

    /*Test User*/
    const [user, setUser] = useState(Document.user)
    const [document, setDocument] = useState(Document.documents)



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

    const functionHandler = () => {
      
    }

    return(
        <section class="documentSection"> 
        
         <div> <Nav /> </ div>
        <h1 class="documentHeader"> Documents </h1>

        {document.map(document => (
        <div class="document">
            <label class="blockTitle"> Created on {document.creation}</label> <br />
            <label class="blockInfo"> {document.title} </label> <br />
            <Button name={document.function} onClick={functionHandler} class="documentButton" />
        </div>
        ))}

        </section>
    )
}



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

    const functionHandler = () => {
      
    }

    // Verifies if the document requieres to be eSigned.
    const signChecker = (d) =>{
        if(d.require_signature){
            return <Button name="eSign" onClick={functionHandler} class="documentButton" />;
        }
        else{
            return;
        }
    }

    useEffect(() => {
        // If no Token the logout.
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
            console.log("TOKEN RES: "+res);
            console.log(res);

            // If there is no data then user info is removed and logs out.
            if(!res.data){

                console.log("GOT THE ERROR");
                localStorage.removeItem('User');
                localStorage.removeItem('Apartment');
                localStorage.removeItem('Token');
            
                window.location.href = window.location.origin+'/Login';
                return;

            }
        })
        .catch((error) => {
            console.log(error);
        });
        
        /*Get Documents*/
        axios({
            method: 'GET',
            params: {user_id:localStorage.getItem('User')},
            url: process.env.REACT_APP_BASE_URL+`/documents/get-user-documents`
        })
        .then(res => {
                setDocument(res.data);
            })
        .catch((error) => {
            console.log(error);
        })

    }, []);

    return(
        <section class="documentSection"> 
        
         <div> <Nav /> </ div>
        <h1 class="documentHeader"> Documents </h1>

        {document.map(document => (
        <div class="document">
            <label class="blockTitle"> Created on {document.date_created}</label> <br />
            <label class="blockInfo"> {document.document} </label> <br />
            {signChecker(document)}
        </div>
        ))}

        </section>
    )
}



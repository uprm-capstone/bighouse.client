import React from 'react';
import axios from 'axios'; 
import Document from '../Components/Tests/DocumentScene.json'; 
import {useRef, useState, useEffect} from 'react';
import '../Styles/index.css';
import Button from '../Components/Buttons/Button.js';
import Nav from '../Components/Sections/Nav.js'; 

export default function Home(){

    /*Test User*/
    const [user, setUser] = useState(Document.user)
    const [document, setDocument] = useState(Document.documents)

    const functionHandler = () => {
      
    }

    const signChecker = (d) =>{
        if(d.require_signature){
            return <Button name="eSign" onClick={functionHandler} class="documentButton" />;
        }
        else{
            return;
        }
    }

    useEffect(() => {
        if(localStorage.getItem('Token')==null){
            window.location.href = window.location.origin+'/Login';
        }
        
        /*Get Documents*/
        axios({
            method: 'GET',
            params: {user_id:localStorage.getItem('User')},
            url: `http://localhost:8008/documents/get-user-documents`
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
        
        <Nav />
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



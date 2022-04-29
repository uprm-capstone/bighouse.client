import React from 'react';
import axios from 'axios'; 
import { useState } from 'react';
import '../Styles/index.css';
import Nav from '../Components/Sections/Nav.js'; 

export default function OpenIssue(){

    const currentDate = new Date();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const status = false;
    const dateCreated = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
    const dateClosed = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();


    const handleSubmit = () => {
        // Validates user's token. If not valid, logs him/her out.
        axios({
            method: 'GET',
            params: {token:localStorage.getItem('Token')},
            url: process.env.REACT_APP_BASE_URL+`/validate`
        })
        .then(res => {
            console.log("TOKEN RES: "+res);
            console.log(res);

            if(!res.data){

                console.log("GOT THE ERROR");
                localStorage.removeItem('User');
                localStorage.removeItem('Apartment');
                localStorage.removeItem('Token');
            
                window.location.href = window.location.origin+'/Login';
                return;

            }
            else{
                const newIssue = {
                title: title,
                apartment_id : localStorage.getItem('Apartment'),
                status : status,
                date_created : dateCreated.toString(),
                date_closed : dateClosed.toString(),
                description : description,
                issue_type : type
                }

                axios.post(process.env.REACT_APP_BASE_URL+`/issues/create-issue`, newIssue )
                .then(res => {
                    window.location.href = window.location.origin+'/Issues';
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
            
    }

    return(
        <section class="issueSection"> 

        <div><Nav/></div>

        <h1 class="h1Gray">New issue</h1>

        <label class='subTitle'>Issue title</label> 

        <input 
                    type="text"
                    id="title"
                    placeholder = "Enter issue title"
                    autocomplete="off"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    />

        <label class='subTitle'>Issue type</label> 

        <input 
                    type="text"
                    id="title"
                    placeholder = "Select type"
                    autocomplete="off"
                    onChange={(e) => setType(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    />

        <label class='subTitle'>Description</label> 

        <input 
                    type="text"
                    id="title"
                    placeholder = "Description..."
                    autocomplete="off"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    aria-describedby="uidnote"
                    />

        <button className='reportButton' onClick={handleSubmit}>Open issue</button>
        </section>
    )
}



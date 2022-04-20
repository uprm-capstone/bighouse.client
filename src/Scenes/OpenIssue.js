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
        const newIssue = {
            title: title,
            apartment_id : localStorage.getItem('Apartment'),
            status : status,
            date_created : dateCreated.toString(),
            date_closed : dateClosed.toString(),
            description : description,
            issue_type : type
        }

        axios.post(`http://localhost:8008/issues/create-issue`, newIssue )
        .then(res => {
            window.location.href = window.location.origin+'/Issues';
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



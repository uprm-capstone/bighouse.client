import React from 'react';
import axios from 'axios'; 
import { useState, useRef} from 'react';
import '../Styles/index.css';
import Nav from '../Components/Sections/Nav.js'; 

export default function OpenIssue(){

    const currentDate = new Date();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const status = true;
    const dateCreated = currentDate.getFullYear()+'-'+currentDate.getMonth()+''+currentDate.getDay();
    const dateClosed = currentDate.getFullYear()+'-'+currentDate.getMonth()+''+currentDate.getDay();


    const handleSubmit = () => {

        axios({
                method: 'POST',
                params: {
                    title: title,
                    apartment_id : localStorage.getItem('Apartment'),
                    status : status,
                    date_created : dateCreated,
                    date_closed : dateClosed,
                    description : description,
                    issue_type : type
                },
                url: `http://localhost:8008/issues/create-issue`
            })
            .then(res => {
                console.log(res);
                // window.location.href = window.location.origin+'/Issues';
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // useEffect(() => {
    //     if(localStorage.getItem('Token')==null){
    //         window.location.href = window.location.origin+'/Login';
    //     }
        
    //     // UNCOMMENT AFTER AXIOS IMPLEMENTATION TO THE OTHER SCENES TO THE CURRENT BRANCH.

    //     // Validates user's token. If not valid, logs him/her out.
    //     // axios({
    //     //     method: 'GET',
    //     //     params: {token:localStorage.getItem('Token')},
    //     //     url: `http://localhost:8008/validate`
    //     // })
    //     // .then(res => {
    //     //     console.log("TOKEN RES: "+res);
    //     //     console.log(res);

    //     //     if(!res.data){

    //     //         console.log("ENTERED IF");

    //     //         console.log("GOT THE ERROR");
    //     //         localStorage.removeItem('User');
    //     //         localStorage.removeItem('Apartment');
    //     //         localStorage.removeItem('Token');
            
    //     //         window.location.href = window.location.origin+'/Login';
    //     //         return;

    //     //     }

    //         // Get Issues data
    //         axios({
    //             method: 'GET',
    //             params: {apartment_id: localStorage.getItem('Apartment')},
    //             url: `http://localhost:8008/issues/get-apartment-issues`
    //         })
    //         .then(res => {
    //             console.log("ISSUES FOR APARTMENT ARE: "+res);
    //                 setIssue(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })

    //     // })
    //     // .catch((error) => {
    //     //     console.log("ERROR:" + error);
    //     // })

    // }, [issue]);

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



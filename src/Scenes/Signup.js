import { useRef, useState, useEffect} from "react";
import DropDownList from "../Components/Inputs/DropDownList";
import FormButton from "../Components/Buttons/FormButton";
import "../Styles/index.css";
import Header from '../Components/Sections/Header.js';
import axios from "axios";
import Select from 'react-select';



const NAME_REGEX = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const DATE_REGEX = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/

const Signup = () => {

    const userRef = useRef();
    const errRef = useRef(); 

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [date, setDate] = useState('');
    const [validDate, setValidDate] = useState(false);
    const [dateFocus, setDateFocus] = useState(false);

    const [gender, setGender] = useState('');

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const getOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ]


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = NAME_REGEX.test(firstName);
        console.log(result);
        console.log(firstName);
        setValidFirstName(result);
    }, [firstName])

    useEffect(() => {
        const result = NAME_REGEX.test(lastName);
        console.log(result);
        console.log(lastName);
        setValidLastName(result);
    }, [lastName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = DATE_REGEX.test(date);
        console.log(result);
        console.log(date);
        setValidDate(result);
    }, [date])

    useEffect(() => {
        console.log(gender); 
        setGender(gender);
    }, [gender])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword; 
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, date, gender, email, password, matchPassword])

    
    const handleChange = (e) => {
        setGender(e.value);
      };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = NAME_REGEX.test(firstName);
        const v2 = NAME_REGEX.test(lastName);
        const v3 = DATE_REGEX.test(date);
        const v4 = EMAIL_REGEX.test(email);
        const v5 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrorMessage("Invalid Entry");
            return;
        }
        console.log(firstName, lastName, date, gender, email, password);
        setSuccess(true);

        const user = {
            user_name: firstName,
            user_lastname: lastName,
            user_gender: gender,
            user_birth: date,
            user_email: email
        };
        const aUser ={
            email:email,
            password:password,
            roles:["boss"]
        }

        console.log("Staring axios");

        // Creates user in authentication table
        axios.post(`http://localhost:8008/auth-create`, aUser )
        .then(res => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })

        // Creates user in main Data Base.
        axios.post(`http://localhost:8008/users/create-user`, user )
        .then(res => {
            console.log(res);
            window.location.href = window.location.origin+"/Login";
        })
        .catch((error) => {
            console.log(error);
        })
        
    }

    return(

        <>
        <Header />
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="#">Sign In</a>
                </p>
            </section>
        ) : (
        <section class="signupSection">

            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

            <h1 class="h1Gray">Sign Up</h1>

        <form class="signupForm" onSubmit={handleSubmit}> 

            <label  class="inputTitle" htmlFor="firstName"> 
               First Name 
                </label>
                <input 
                    type="text"
                    id="firstName"
                    placeholder = "Enter First Name"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    aria-invalid={validFirstName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                    />
                    <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>

                        Must begin with a letter. <br />
                        Numbers, underscores, hyphens and special characters are not allowed.
                    </p>

                    <label class="inputTitle" htmlFor="lastName"> 
                        Last Name 
                </label>
                <input 
                    type="text"
                    id="lastName"
                    placeholder = "Enter Last Name"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    aria-invalid={validLastName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                    />
                    <p id = "uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>

                       Must begin with a letter. <br />
                       Numbers, underscores, hyphens and special characters are not allowed.

                    </p>

                    <label class="inputTitle" htmlFor="dateOfBirth"> 
                        Date of Birth
                </label>
                <input 
                    type="text"
                    id="date"
                    placeholder = "MM/DD/YYYY"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setDate(e.target.value)}
                    required
                    aria-invalid={validDate ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setDateFocus(true)}
                    onBlur={() => setDateFocus(false)}
                    />
                    <p id = "uidnote" className={dateFocus && date && !validDate ? "instructions" : "offscreen"}>

                        Must follow the MM/DD/YYYY format. 
                    </p>

                    <label class="inputTitle" htmlFor="gender">Gender</label>

                    <div class="dropDown">
                        <Select options={getOptions} onChange={handleChange} />
                    </div>
                

                <label class="inputTitle" htmlFor="email"> 
                        Email
                </label>
                <input 
                    type="email"
                    id="email"
                    placeholder = "Enter Email"
                    ref={userRef}
                    autocomplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    />
                    <p id = "uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>

                        4 to 24 characters. <br />
                        Letters, numbers, underscores, periods, hyphens allowed. 
                    </p>

                    <label class="inputTitle" htmlFor="password">
                            Password
                        </label>

                    <input
                            type="password"
                            id="password"
                            placeholder = "Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passworddnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label class="inputTitle" htmlFor="confirm_pwd">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirm_password"
                            placeholder="Confirm Password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field.
                        </p>


                        {/* <FormButton name="Sign Up" disabled={!validFirstName || !validLastName || !validDate || !validEmail
            || !validPassword || !validMatch ? true : false} /> */}

            <button>Sign Up</button>
                   
            </form>
            <p class="login">
                        <span className="line">
                            {/*put router link here*/}
                            <a href={window.location.origin+"/Login"}>Login</a>
                        </span>
                    </p>
        </section>
        )}
        </>
    )
}

export default Signup

   

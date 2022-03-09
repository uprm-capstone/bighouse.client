import { useRef, useState, useEffect} from "react";
import DropDownList from "./DropDownList";
import "./index.css";


const NAME_REGEX = /^[a-z][a-zA-Z0-9-_]$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const DATE_REGEX = /^(((((0[1-9])|(1\d)|(2[0-8]))-((0[1-9])|(1[0-2])))|((31-((0[13578])|(1[02])))|((29|30)-((0[1,3-9])|(1[0-2])))))-((20[0-9][0-9]))|(29-02-20(([02468][048])|([13579][26]))))$/;

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

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);


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
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword; 
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, date, email, password, matchPassword])


  

    return(
        <section class="signupSection">

            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>

            <h1 class="h1Gray">Sign Up</h1>

        <form class="signupForm"> 

            <label  class="inputTitle" htmlFor="firstName"> 
               First Name: 
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
                    <p id = "uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>

                       {/* Must begin with a letter. <br />
                        Numbers, underscores, hyphens and special characters are not allowed. */}
                    </p>

                    <label class="inputTitle" htmlFor="lastName"> 
                        Last Name: 
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

                       {/*Must begin with a letter. <br />
                        Numbers, underscores, hyphens and special characters are not allowed. */}
                    </p>

                    <label class="inputTitle" htmlFor="dateOfBirth"> 
                        Date of Birth: 
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

                       {/* Must follow the DD/MM/YYYY format. */}
                    </p>

                    <label class="inputTitle" htmlFor="gender">
                            Gender: 
                        </label>
                    <DropDownList />
                

                <label class="inputTitle" htmlFor="email"> 
                        Email: 
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

                       {/* 4 to 24 characters. <br />
                        Letters, numbers, underscores, periods, hyphens allowed. */} 
                    </p>

                    <label class="inputTitle" htmlFor="password">
                            Password:
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
                            {/*8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> */}
                        </p>

                        <button> Submit</button>

            </form>
        </section>
    )
}

export default Signup

   

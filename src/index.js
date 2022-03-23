import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Navigate, BrowserRouter, Routes} from 'react-router-dom';
import Login from './Scenes/Login';
import Signup from './Scenes/Signup';
import RecoverPassword from './Scenes/RecoverPassword';
import Header from './Components/Sections/Header';

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <BrowserRouter>
        <Routes>
            <Route exact path="/Login" element={<div class="App"><Header /><Login /></ div>} />
            <Route exact path="/Signup" element={<div class="App"><Header /><Signup /></ div>} />
            <Route exact path="/Recover-Password" element={<div class="App"><Header /><RecoverPassword /></ div>} />
            <Route path="*" element={<Navigate to ="/Login" />}/>
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

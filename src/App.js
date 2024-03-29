import React, { useState } from 'react';
import Header from './Components/Sections/Header';

import Login from './Scenes/Login';
import Signup from './Scenes/Signup';
import RecoverPassword from './Scenes/RecoverPassword';
import Home from './Scenes/Home';
import Documents from './Scenes/Documents'; 


function App() {

  return (
    <div class="App">
    <Login />
    <RecoverPassword />
    <Signup /> 
    <Home /> 
    <Documents />

    </ div>

  )
}


export default App;

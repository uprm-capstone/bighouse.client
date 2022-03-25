import React, { useState } from 'react';
import Header from './Components/Sections/Header';

import Login from './Scenes/Login';
import Signup from './Scenes/Signup';
import RecoverPassword from './Scenes/RecoverPassword';


function App() {

  return (
    <div class="App">
    <Header />
    <Login />
    </ div>

  )
}


export default App;

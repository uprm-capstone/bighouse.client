import React from 'react';
import image from './Header.png';
import './index.css';


export default function Header() {
  return (
    <div className='staticHeader'>
        {<img class='headerImage' src={image} alt="this is the header image for the application" />}
    </div>
  )
}

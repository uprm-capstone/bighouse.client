import React from 'react';
import image from '../../Styles/Header.png';


 function Header() {
  return (
    <div className='staticHeader'>
        {<img class='headerImage' src={image} alt="this is the header image for the application" />}
    </div>
  )
}

export default Header; 

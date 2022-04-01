import React from 'react'; 

export default function HamburgerMenu (){

return (
  <>
  <div className="hamburgerMenu"> 
    <div className="hamburgerPart" />
    <div className="hamburgerPart" />
    <div className="hamburgerPart" />
  </div>

  <style jsx>{`
                .hamburgerMenu{
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    justify-content: space-around;
                    flex-flow: column nowrap;
                    z-index: 10;
                }
                .hamburgerPart{
                    width: 2rem;
                    height: 0.25rem;
                    margin-bottom: 5px; 
                    border-radius: 10px;
                    background-color: black;
                    transform-origin: 1px;
                    transition: all 0.3s linear;
                }
                `}
   </style>
  </>
)
}
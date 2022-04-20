import React from 'react'; 

export default function HamburgerMenu (){

return (
  <>
  <div className="hamburgerMenu"> 
    <div className="hamburgerPart" />
    <div className="hamburgerPart" />
    <div className="hamburgerPart" />
  </div>

  <div className="hamburgerX"> 
    <div className="hamburgerXPart1" />
    <div className="hamburgerXPart2" />
  </div>

  <style jsx>{`
                .hamburgerMenu{
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    justify-content: space-around;
                    flex-flow: column nowrap;
                    position: absolute; 
                    top: 20px; 
                    left: -35px; 
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

                .hamburgerX{
                  position: fixed; 
                  top: 30px; 
                  left: 165px; 
                }

                .hamburgerXPart1{
                  width: 2rem;
                  height: 0.25rem;
                  border-radius: 10px;
                  background-color: black;
                  transform-origin: 1px;
                  transition: all 0.3s linear;
                  transform: rotate(45deg);
                }

                .hamburgerXPart2{
                  width: 2rem;
                  height: 0.25rem;
                  border-radius: 10px;
                  background-color: black;
                  transform-origin: 21px 10px;
                  transition: all 0.3s linear;
                  transform: rotate(-45deg);
                }
                `}
   </style>
  </>
)
}
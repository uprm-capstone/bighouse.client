import React, {useState} from 'react'; 
import "../../Styles/index.css"; 
import HamburgerMenu from "./HamburgerMenu.js"




export default function Nav (){

  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }

return (
  <nav className="navBar">
 <ul>
     <li><a href='#'>Home</a></li>
     <li><a href='#'>Payments</a></li>
     <li><a href='#'>Issues</a></li>
     <li><a href='#'>Documents</a></li>
     <li><a href='#'>Payment History</a></li>
     <br /> 
     <li><a href='#'>Account</a></li>
     <li><a href='#'>Login</a></li>  
 </ul>

    <div onClick={handleToggle}> 
        <HamburgerMenu />
    </div>
    
    <style jsx>{`
                .navBar{
                    width: 100%;
                    height: 50px;
                }
                
                .navBar ul{
                    display:flex;
                    flex-wrap: wrap;
                    float: right;
                    margin-top: 10px;
                    margin-right: 10px; 
                    padding: 0px;
                    overflow: hidden;
                }
                .navBar ul li{
                    list-style-type: none;
                    padding-right: 10px;
                }
                .hamburgerMenu{
                    display: none;
                    z-index: 6;
                } 
                .hamburgerX{
                    display: none; 
                    z-index: 6; 
                }

                @media (max-width: 767px){
                  
                    .hamburgerMenu{
                        display: ${navbarOpen ? 'none' : 'block'};
                        padding-top: 10px;
                        margin-left: 165px;
                        z-index: 6;
                    }
                
                   
                    .hamburgerX{
                        display: ${navbarOpen ? 'block' : 'none'};
                        margin-left: 165px;
                        z-index: 10; 
                    }

                    .navBar ul{
                        display: ${navbarOpen ? 'inline' : 'none'};
                        background-color: #FFFFFF;
                        border-color: #707070;
                        box-shadow: 0px 0px 5px 0px gray;
                        height: 100%;
                        width: 50vw;
                        padding-top: 80px; 
                        position: fixed;
                        left: 200px; 

                        
                    }

                    .navBar li{

                        padding-left: 25px; 
                        padding-top: 5px;
                        padding-bottom: 1px; 
                    }
                }
                
               
                
            `}</style>
  </nav>
)

}
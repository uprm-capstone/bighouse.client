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

    <div className="hamburgerMenu" onClick={handleToggle}> 
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
                    margin: 0px;
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
                @media (max-width: 767px){
                  
                    .hamburgerMenu{
                        display:block;
                        padding-top: 10px;
                        margin-left: 10px;
                        z-index: 6;
                    }
                
                   
                    .navBar ul{
                        display: ${navbarOpen ? 'inline' : 'none'};
                        background-color: #FFFFFF;
                        border-color: #707070;
                        height: 100vh;
                        width: 50vw;
                        margin-top: 50px;
                        position: fixed;
                        
                    }
                }
                
               
                
            `}</style>
  </nav>
)

}
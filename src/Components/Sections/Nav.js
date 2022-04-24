import React, {useState} from 'react'; 
import "../../Styles/index.css"; 
import HamburgerMenu from "./HamburgerMenu.js"




export default function Nav (){

  const [navbarOpen, setNavbarOpen] = useState(false)

  const logout = () => {
      localStorage.removeItem('User');
      window.location.href = window.location.origin+"/Login";
  }

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }

return (
  <nav className="navBar">
 <ul>
     <li><a href={window.location.origin+"/Home"}>Home</a></li>
     <li><a href={window.location.origin+"/Payment"}>Payments</a></li>
     <li><a href={window.location.origin+"/Issues"}>Issues</a></li>
     <li><a href={window.location.origin+"/Documents"}>Documents</a></li>
     <li><a href='#'>Payment History</a></li>
     <br /> 
     <li><a href='#'>Account</a></li>
     <li><a onClick={logout}>Log out</a></li>  
 </ul>

    <div onClick={handleToggle}> 
        <HamburgerMenu />
    </div>
    
    <style jsx>{`
                .navBar{
                    width: 100%;
                    height: 100%;
                }
                
                .navBar ul{
                    display:flex;
                    flex-wrap: wrap;
                    
                    padding: 0px;
                    overflow: hidden;
                }
                @media (min-width: 500px){
                    .navBar ul {
                    margin-top: 10px;
                    margin-left: 175px; 
                    margin-right: auto; 
                    }
                }
                .navBar ul li{
                    font-family: "Segoe UI";
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

                @media (min-width: 768px) and (max-width: 860px){
                  
                    .hamburgerMenu{
                        display: ${navbarOpen ? 'none' : 'block'};
                        padding-top: 10px;
                        margin-left: 55%;
                        z-index: 6;
                    }
                  
                    .hamburgerX{
                        display: ${navbarOpen ? 'block' : 'none'};
                        margin-left: 55%;
                        z-index: 10; 
                    }

                    .navBar ul{
                        display: ${navbarOpen ? 'inline' : 'none'};
                        margin-top: 0px; 
                        background-color: #FFFFFF;
                        border-color: #707070;
                        box-shadow: 0px 0px 5px 0px gray;
                        height: 100%;
                        width: 40vw;
                        padding-top: 80px; 
                        position: fixed;
                        left: 45%;  
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
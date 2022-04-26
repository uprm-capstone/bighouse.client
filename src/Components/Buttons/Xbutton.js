import React from "react";

export default function Xbutton(){

return (
    <>
<div className="hamburgerX"> 
    <div className="hamburgerXPart1" />
    <div className="hamburgerXPart2" />
  </div>

<style jsx>{`

.hamburgerX{
  position: absolute; 
  top: 30px; 
  left: 325px; 
}

@media (min-width: 767px){
    .hamburgerX{
        left: 75%;
    }
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
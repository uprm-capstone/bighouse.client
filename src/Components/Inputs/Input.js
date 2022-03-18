import "../../Styles/index.css";
import React from "react";



function Input(props) {
  return <input  
  type = {props.type}
  id= {props.id}
  placeholder = {props.placeholder}
  ref={props.ref}
  value={props.value}
  autocomplete= {props.autocomplete}
  onChange={props.onChange}
  required
  aria-invalid={props.aria}
  aria-describedby={props.aria}
  onFocus={props.onFocus}
  onBlur={props.onBlur}
  >
  </input>;
}
export default Input;

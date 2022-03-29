import React from "react";
import '../../Styles/index.css';

function Button(props) {
  return <button onClick={props.onClick} class={props.class}>{props.name}</button>;
}
export default Button;


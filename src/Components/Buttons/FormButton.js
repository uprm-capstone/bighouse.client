
import React from "react";

function FormButton(props) {
  return <button onClick={props.click} disabled={props.disabled}>{props.name}</button>;
}
export default FormButton;


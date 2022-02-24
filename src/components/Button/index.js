import React from "react";

import "./style.css";

function Button({ children, ...props }) {
  return <button className="button-component">{children}</button>;
}

export default Button;

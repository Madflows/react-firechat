import React from "react";

const Button = ({ onClick = null, children = null, className = null }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

export default Button;

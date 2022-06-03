import React from "react";

const Button = ({ onClick = null, children = null, className = null }) => (
  <button onClick={onClick} 
  className={className + "rounded shadow-md pl-6 pr-8 py-3 bg-gray-100 hover:bg-slate-200 text-gray-600 font-medium flex items-center justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75"}
  >
    {children}
  </button>
);

export default Button;

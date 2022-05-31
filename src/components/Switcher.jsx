import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Switcher = () => {
  const [dark, setDark] = useState(false);
  dark
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={() => setDark(!dark)}
      className="text-gray-500 dark:text-gray-600 absolute 
      top-1 right-2 bg-gray-600 dark:bg-gray-200 
      focus:outline-none focus:ring-2 focus:ring-gray-200 
      dark:focus:ring-gray-700 rounded-full text-sm p-2"
    >
      {dark ? (
        <FaSun id="theme-toggle-dark-icon" className="w-3 h-3 text-gray-700" />
      ) : (
        <FaMoon id="theme-toggle-dark-icon" className="w-3 h-3 text-white" />
      )}
    </button>
  );
};

export default Switcher;

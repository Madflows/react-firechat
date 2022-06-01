import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
// import { Tooltip } from "@material-tailwind/react";

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
      className="text-gray-200 dark:text-gray-600 absolute 
      top-2 right-2 bg-gray-600 dark:bg-gray-200 
      focus:outline-none focus:ring-2 focus:ring-gray-200 
      dark:focus:ring-gray-700 rounded-full text-sm py-3 px-4
      flex gap-2 items-center justify-center transition-all"
    >
      {dark ? (
        <FaSun id="theme-toggle-dark-icon" className="w-4 h-4 text-gray-700" />
      ) : (
        <FaMoon id="theme-toggle-dark-icon" className="w-4 h-4 text-white" />
      )}
      <p>{dark ? "Light Mode" : "Dark Mode"}</p>
    </button>
  );
};

export default Switcher;

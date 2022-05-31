import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Loader = ({ variant = "primary", size = "default" }) => {
  const loaderClass = classNames(
    // Border
    ["rounded-full", "border-gray-500", "border-opacity-25"],
    // Animation
    "animate-spin",
    // Variant
    variant === "white" ? "border-t-white" : `border-t-${variant}-500`,
    // Size
    size === "sm" && "w-6 h-6 border-2",
    size === "default" && "w-8 h-8 border-4",
    size === "lg" && "w-12 h-12 border-4"
  );

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      {/* <div className={loaderClass} /> */}
      <AnimatedLoader />
      <p className="text-slate-700">Decentralizing...</p>
    </div>
  );
};

Loader.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "white"]),
  size: PropTypes.oneOf(["sm", "default", "lg"]),
};

export default Loader;

function AnimatedLoader(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <style>
        {
          "@keyframes loader2{0%{-webkit-transform:rotate(0);transform:rotate(0)}}"
        }
      </style>
      <path
        fill="#265BFF"
        d="M17.179 13.605a.431.431 0 00.279.514l.775.245a.393.393 0 00.499-.268 7.318 7.318 0 00-4.5-8.658.39.39 0 00-.507.255l-.245.775a.43.43 0 00.261.523 5.69 5.69 0 013.438 6.614z"
        style={{
          animation: "loader2 1s cubic-bezier(.63,-.71,.32,1.28) infinite both",
          transformOrigin: "center center"
        }}
      />
    </svg>
  )
}
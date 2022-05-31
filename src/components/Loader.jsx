import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Loader = ({ variant = "primary", size = "default" }) => {
  const loaderClass = classNames(
    // Border
    ["rounded-full", "border-gray-300", "border-opacity-25"],
    // Animation
    "animate-spin",
    // Variant
    variant === "white" ? "border-t-white" : `border-t-${variant}-500`,
    variant === "slate" ? "border-t-slate-700" : `border-t-${variant}-500`,
    // Size
    size === "sm" && "w-6 h-6 border-2",
    size === "default" && "w-8 h-8 border-4",
    size === "lg" && "w-12 h-12 border-4"
  );

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <div>
        <div className={loaderClass} />
      </div>
      <p className="text-slate-700">Decentralizing...</p>
    </div>
  );
};

Loader.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "white"]),
  size: PropTypes.oneOf(["sm", "default", "lg"]),
};

export default Loader;

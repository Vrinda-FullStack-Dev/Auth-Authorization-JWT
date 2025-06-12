import React from "react";
import PropTypes from "prop-types";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-orange-700",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Prop Types for better validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

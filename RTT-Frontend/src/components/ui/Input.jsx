import React, { useId } from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", error, ...props },
  ref
) {
  const id = useId();
  
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border ${error ? 'border-red-500' : 'border-gray-200'} w-full ${className}`}
        ref={ref}
        id={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <span id={`${id}-error`} className="text-red-500 text-sm">{error}</span>}
    </div>
  );
});

// Prop Types for better validation
Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default Input;

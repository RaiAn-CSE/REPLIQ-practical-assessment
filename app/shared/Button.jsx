import React from "react";

const Button = ({ text, onClick, className, type = "button" }) => {
    return (
        <button
            // type={type}
            onClick={onClick}
            className={`mt-2 px-4 py-2 text-black bg-yellow-300 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            {text}
        </button>
    );
};

export default Button;

import React from 'react';

const Button = ({ onClick, label, className, ...props }) => {
    return (
        <button
            className={className}
            onClick={onClick}
            {...props}>
            {label}
        </button>
    );
};

export default Button;
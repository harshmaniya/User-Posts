import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className="bg-red-500 p-4 text-white font-bold fixed top-auto left-0 right-0 text-center">
            {message}
        </div>
    );
};

export default ErrorMessage;

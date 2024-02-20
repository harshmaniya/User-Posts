import React from 'react';

function Select({
  label,
  options,
  className,
  id,
  error,
  ...props
}, ref) {
  return (
    <div className="mb-3">
      {label && <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>}
      <select
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 ${className}`}
        {...props}
        ref={ref}
        id={id}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className='text-sm text-red-600'>{label} is required</span>}
    </div>

  );
}

export default React.forwardRef(Select);

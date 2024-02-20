import React from 'react';

function RadioButton({
    label,
    className,
    id,
    name,
    value,
    checked,
    onChange,
    option,
    error,
    ...props
}, ref) {
    return (
        <>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="flex items-center space-x-6 mt-2">
                {option.map((data, index) => (
                    <>
                        <div key={index} className="flex items-center gap-x-3">
                            <input
                                type="radio"
                                id={id}
                                value={data}
                                checked={checked}
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                {...props}
                            />
                            {data && <label htmlFor={id} className="ml-2">{data}</label>}
                        </div>
                    </>
                ))
                }
            </div>
            {error && <span className='text-red-500'>{label} is required</span>}
        </>
    );
}

export default React.forwardRef(RadioButton);

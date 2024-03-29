import React from 'react';

function CheckBoxButton({
    label,
    className,
    id,
    name,
    error,
    option,
    ...props
}, ref) {
    return (
        <>

            <div className="mb-3 row">
                {/* <label className="form-label col-auto">
                    {label}
                </label> */}
                {option.map((data)=>(
                    <div className="form-check col-auto">
                        <input
                            type="checkbox"
                            className={`form-check-input ${className}`}                        
                            ref={ref}
                            name={name}
                            id={id}
                            value={data}
                            {...props}
                        />
                        {<label className="form-check-label ml-3">{label}</label>}
                    </div>
                ))}
                {error && <span className='text-red-500'>{label} is required</span>}
            </div>
        </>
    );
}

export default React.forwardRef(CheckBoxButton);

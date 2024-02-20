import React from 'react';

function File({
    label,
    className,
    id,
    error,
    ...props
}, ref) {

    return (
        <div className="mb-3">
            {label && <label className="form-label"> {label} </label>}
            <input
                type="file"
                className={`form-control ${className}`}
                {...props}
                ref={ref}
                id={id}
            />
            {error && <span>{label} is required</span>}
        </div>
    );
}

export default React.forwardRef(File);

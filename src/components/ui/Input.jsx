import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Input Component
 * Supports text, password, email, and other input types
 */
const Input = forwardRef(({
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    name,
    id,
    error,
    helperText,
    disabled = false,
    required = false,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}, ref) => {
    const inputId = id || name;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-text-primary mb-2"
                >
                    {label}
                    {required && <span className="text-accent-red ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                        {icon}
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    id={inputId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`
            w-full h-11 px-4 rounded-lg border transition-all duration-base
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${error
                            ? 'border-accent-red focus:border-accent-red focus:ring-2 focus:ring-red-100'
                            : 'border-neutral-300 focus:border-primary-main focus:ring-2 focus:ring-primary-50'
                        }
            ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'bg-white text-text-primary'}
            placeholder:text-neutral-400
            focus:outline-none
          `}
                    {...props}
                />

                {icon && iconPosition === 'right' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                        {icon}
                    </div>
                )}
            </div>

            {(error || helperText) && (
                <p className={`text-sm mt-1 ${error ? 'text-accent-red' : 'text-neutral-600'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.string,
    helperText: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button Component
 * Supports multiple variants, sizes, and states
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'base',
    type = 'button',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon = null,
    iconPosition = 'left',
    onClick,
    className = '',
    ...props
}) => {
    // Variant styles
    const variantStyles = {
        primary: 'bg-primary-main text-white hover:bg-primary-dark active:bg-primary-700 shadow-sm',
        secondary: 'bg-secondary-main text-white hover:bg-secondary-dark active:bg-secondary-dark shadow-sm',
        outline: 'bg-transparent border-2 border-primary-main text-primary-main hover:bg-primary-50 active:bg-primary-100',
        ghost: 'bg-transparent text-primary-main hover:bg-primary-50 active:bg-primary-100',
        danger: 'bg-accent-red text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
        success: 'bg-accent-green text-white hover:bg-green-600 active:bg-green-700 shadow-sm',
    };

    // Size styles
    const sizeStyles = {
        sm: 'h-9 px-3 text-sm',
        base: 'h-11 px-5 text-base',
        lg: 'h-13 px-6 text-lg',
    };

    // Combined classes
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-base focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const widthClass = fullWidth ? 'w-full' : '';

    const combinedClassName = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`;

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={combinedClassName}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {!loading && icon && iconPosition === 'left' && <span>{icon}</span>}
            {children}
            {!loading && icon && iconPosition === 'right' && <span>{icon}</span>}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success']),
    size: PropTypes.oneOf(['sm', 'base', 'lg']),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    fullWidth: PropTypes.bool,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;

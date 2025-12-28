import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * OTP Input Component
 * For entering verification codes (default 6 digits)
 */
const OTPInput = ({
    length = 6,
    value = '',
    onChange,
    onComplete,
    error = false,
    disabled = false,
    className = '',
}) => {
    const [otp, setOtp] = useState(value.split('').slice(0, length));
    const inputRefs = useRef([]);

    useEffect(() => {
        setOtp(value.split('').slice(0, length));
    }, [value, length]);

    const handleChange = (index, e) => {
        const val = e.target.value;

        // Only allow numbers
        if (val && !/^\d$/.test(val)) return;

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);

        // Call onChange with full OTP string
        const otpString = newOtp.join('');
        onChange(otpString);

        // Auto-focus next input
        if (val && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Call onComplete when all digits are filled
        if (otpString.length === length && onComplete) {
            onComplete(otpString);
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);

        // Only allow numeric paste
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('').slice(0, length);
        setOtp(newOtp);

        const otpString = newOtp.join('');
        onChange(otpString);

        // Focus last filled input
        const lastIndex = Math.min(pastedData.length - 1, length - 1);
        inputRefs.current[lastIndex]?.focus();

        // Call onComplete if all filled
        if (otpString.length === length && onComplete) {
            onComplete(otpString);
        }
    };

    const handleFocus = (e) => {
        e.target.select();
    };

    return (
        <div className={`flex gap-3 justify-center ${className}`}>
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={handleFocus}
                    disabled={disabled}
                    className={`
            w-14 h-14 text-center text-2xl font-semibold rounded-lg border-2 transition-all duration-base
            ${error
                            ? 'border-accent-red focus:border-accent-red focus:ring-2 focus:ring-red-100'
                            : 'border-neutral-300 focus:border-primary-main focus:ring-2 focus:ring-primary-50'
                        }
            ${disabled ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' : 'bg-white text-text-primary'}
            focus:outline-none
          `}
                />
            ))}
        </div>
    );
};

OTPInput.propTypes = {
    length: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default OTPInput;

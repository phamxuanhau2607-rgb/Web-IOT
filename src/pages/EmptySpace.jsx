import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptySpace = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white h-full overflow-hidden">
            <div className="max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Looks like you have no spaces set up.
                </h1>
                <p className="text-gray-400 text-lg mb-12">
                    Add your house and start your smart life!
                </p>

                {/* Illustration Placeholder */}
                <div className="relative w-80 h-64 mx-auto mb-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-50 rounded-full opacity-50 scale-90" />
                    <svg viewBox="0 0 200 160" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* House Shape */}
                        <path d="M40 80 L100 30 L160 80 V140 H40 Z" fill="#CBD5E1" />
                        <path d="M100 30 L160 80 H40 Z" fill="#94A3B8" />
                        {/* Windows/Door */}
                        <rect x="90" y="100" width="20" height="40" fill="#64748B" />
                        <rect x="60" y="100" width="15" height="15" fill="#E2E8F0" />
                        <rect x="125" y="100" width="15" height="15" fill="#E2E8F0" />
                        {/* Ghost/Character */}
                        <circle cx="60" cy="85" r="25" fill="#94A3B8" />
                        <path d="M35 85 Q35 110 60 110 Q85 110 85 85" fill="#94A3B8" />
                        <circle cx="52" cy="80" r="2" fill="white" />
                        <circle cx="68" cy="80" r="2" fill="white" />
                        <path d="M55 90 Q60 95 65 90" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        {/* Decorative elements */}
                        <path d="M170 60 L175 65 M175 60 L170 65" stroke="#CBD5E1" strokeWidth="2" />
                        <circle cx="30" cy="40" r="3" stroke="#CBD5E1" strokeWidth="1" />
                    </svg>
                </div>

                <button
                    onClick={() => navigate('/create-space')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-12 rounded-xl transition-colors shadow-lg shadow-blue-100 w-full max-w-xs cursor-pointer"
                >
                    Set up your space
                </button>
            </div>
        </div>
    );
};

export default EmptySpace;
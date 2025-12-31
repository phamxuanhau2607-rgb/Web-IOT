import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sofa, Bed, ChefHat, Bath, Sun, Monitor } from 'lucide-react';

export default function AddRooms() {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('Living Room');
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const ROOM_TYPES = [
        { name: 'Living Room', icon: Sofa },
        { name: 'Bedroom', icon: Bed },
        { name: 'Kitchen', icon: ChefHat }, // Using ChefHat as a proxy for Kitchen/Cook
        { name: 'Bathroom', icon: Bath },
        { name: 'Outdoor', icon: Sun },
        { name: 'Office', icon: Monitor }, // Changed to Monitor which is more standard than Desktop
    ];

    const handleBack = () => {
        navigate(-1);
    };

    const handleContinue = () => {
        if (!selectedType) {
            setError('Please select a room type');
            return;
        }
        if (!area || isNaN(area) || Number(area) <= 0) {
            setError('Please enter a valid area size');
            return;
        }

        // Navigate to next step (placeholder for now)
        // navigate('/add-devices'); 
        alert(`Added ${selectedType} with ${area}m² (Logic pending)`);
    };

    return (
        <div className="flex-1 h-screen overflow-y-auto relative bg-gray-50 text-gray-800 font-sans">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 pt-8 pb-32 relative rounded-b-[50px] shrink-0 z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                <div className="relative z-10 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-300" />
                    </button>
                    <div className="text-center">
                        <h1 className="text-xl font-bold mb-1">Add new rooms</h1>
                        <p className="text-gray-400 text-sm">Choose room type and size</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Step</p>
                        <p className="font-bold text-lg">2<span className="text-gray-500 text-sm font-normal mx-1">|</span>7</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center -mt-20 relative z-10 px-4 pb-32">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            {error}
                        </div>
                    )}

                    {/* Room Type Grid */}
                    <div className="mb-8">
                        <label className="block text-gray-700 font-bold mb-4 text-sm uppercase tracking-wide">
                            Type
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {ROOM_TYPES.map((type) => {
                                const Icon = type.icon;
                                const isSelected = selectedType === type.name;
                                return (
                                    <button
                                        key={type.name}
                                        onClick={() => setSelectedType(type.name)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className={`w-8 h-8 mb-3 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} strokeWidth={1.5} />
                                        <span className="text-sm font-medium">{type.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Area Input */}
                    <div className="mb-8">
                        <label className="block text-gray-700 font-bold mb-4 text-sm uppercase tracking-wide">
                            Area
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300"
                                placeholder="e.g. 24"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                m²
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-100 px-8 py-5 flex items-center justify-between z-20">
                <p className="text-gray-400 text-sm font-medium">Add details for your room</p>
                <button
                    onClick={handleContinue}
                    className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-semibold shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    Add Room
                </button>
            </div>
        </div>
    );
}

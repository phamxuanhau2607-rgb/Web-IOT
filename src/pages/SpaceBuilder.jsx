import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft,
    PencilLine,
    Plus,
    X,
    Sofa,
    Bed,
    ChefHat,
    Bath,
    Sun,
    Monitor
} from 'lucide-react';

const Badge = ({ count, label }) => (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl">
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="text-sm font-bold text-gray-700">{count}</span>
        <span className="text-sm text-gray-400">{label}</span>
    </div>
);

export default function SpaceBuilder() {
    const navigate = useNavigate();
    const location = useLocation();

    const houseName = location.state?.houseName || 'My Home';
    const bgImage = location.state?.bgImage || 'https://csspicker.dev/api/image/?q=modern+house+exterior&image_type=photo';

    const [rooms, setRooms] = useState(location.state?.rooms || []);
    const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

    // Add Room Form State
    const [selectedType, setSelectedType] = useState('Living Room');
    const [area, setArea] = useState('');
    const [error, setError] = useState('');

    const ROOM_TYPES = [
        { name: 'Living Room', icon: Sofa },
        { name: 'Bedroom', icon: Bed },
        { name: 'Kitchen', icon: ChefHat },
        { name: 'Bathroom', icon: Bath },
        { name: 'Outdoor', icon: Sun },
        { name: 'Office', icon: Monitor },
    ];

    const handleAddRoom = () => {
        if (!selectedType) {
            setError('Please select a room type');
            return;
        }
        if (!area || isNaN(area) || Number(area) <= 0) {
            setError('Please enter a valid area size');
            return;
        }

        const newRoom = { type: selectedType, area: area };
        setRooms([...rooms, newRoom]);

        // Reset and close
        setArea('');
        setError('');
        setIsAddRoomOpen(false);
    };

    return (
        <div className="flex-1 flex flex-col bg-white relative h-screen overflow-hidden">

            {/* Dark Header Section */}
            <div className="bg-[#1e293b] text-white pt-10 pb-24 px-10 rounded-b-[40px] relative shrink-0">
                <div className="flex justify-between items-start max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate('/create-space')}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-1">Create a new space</h2>
                        <p className="text-gray-400 text-sm">Organise your space</p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Step</p>
                        <p className="text-xl font-bold">3 <span className="text-gray-500 font-normal">| 7</span></p>
                    </div>
                </div>
            </div>

            {/* Floating Info Card */}
            <div className="max-w-5xl mx-auto w-full px-10 -mt-16 relative z-10 shrink-0">
                <div className="bg-white rounded-3xl p-4 shadow-xl shadow-gray-100 border border-gray-50 flex items-center gap-6">
                    <img
                        src={bgImage}
                        className="w-24 h-24 rounded-2xl object-cover"
                        alt="My Home"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-800">{houseName}</h3>
                            <PencilLine size={16} className="text-blue-400 cursor-pointer" />
                        </div>
                        <p className="text-sm text-gray-400">11-5 Raddington Rd, London, UK</p>
                    </div>
                    <div className="flex gap-3">
                        <Badge count={rooms.length} label="Rooms" />
                        <Badge count={0} label="Devices" />
                        <Badge count={0} label="Members" />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto w-full px-10 py-12 flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-800">Add rooms</h4>
                        <p className="text-sm text-gray-400">Organize your space by adding and customizing rooms</p>
                    </div>
                    <button
                        onClick={() => setIsAddRoomOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-blue-100 text-blue-500 rounded-xl font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                        <Plus size={18} />
                        Add new rooms
                    </button>
                </div>

                {/* Empty State / Room List */}
                {rooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 opacity-60">
                        <div className="relative w-64 h-48 mb-6">
                            <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40 80 L100 30 L160 80 V140 H40 Z" fill="#CBD5E1" />
                                <path d="M100 30 L160 80 H40 Z" fill="#94A3B8" />
                                <rect x="90" y="100" width="20" height="40" fill="#64748B" />
                                {/* Floating boxes representing rooms */}
                                <rect x="20" y="90" width="30" height="30" fill="white" stroke="#CBD5E1" strokeWidth="2" />
                                <rect x="140" y="40" width="40" height="20" fill="white" stroke="#CBD5E1" strokeWidth="2" />
                                <rect x="150" y="80" width="40" height="40" fill="white" stroke="#CBD5E1" strokeWidth="2" />
                                <rect x="145" y="125" width="20" height="20" fill="white" stroke="#CBD5E1" strokeWidth="2" />
                            </svg>
                        </div>
                        <p className="text-gray-400 font-medium">You have 0 rooms added to your space</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rooms.map((room, idx) => (
                            <div key={idx} className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
                                        <span className="font-bold">{room.type?.[0]}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">{room.type}</p>
                                        <p className="text-xs text-gray-400">{room.area} m²</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky Footer */}
            <div className="bg-white border-t border-gray-100 p-6 px-10 shrink-0 relative z-20">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Add all your rooms and go to the next step.</p>
                    <div className="flex gap-4">
                        <button className="px-10 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            Skip
                        </button>
                        <button
                            disabled={rooms.length === 0}
                            className="px-12 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>

            {/* --- ADD ROOM RIGHT SIDEBAR OVERLAY --- */}
            {isAddRoomOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsAddRoomOpen(false)}
                    />

                    {/* Sidebar Drawer */}
                    <div className="fixed top-2 bottom-2 right-2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Add New Room</h2>
                                <p className="text-sm text-gray-400">Select details for your room</p>
                            </div>
                            <button
                                onClick={() => setIsAddRoomOpen(false)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            {/* Room Type Grid */}
                            <div className="mb-8">
                                <label className="block text-gray-700 font-bold mb-4 text-sm uppercase tracking-wide">
                                    Type
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {ROOM_TYPES.map((type) => {
                                        const Icon = type.icon;
                                        const isSelected = selectedType === type.name;
                                        return (
                                            <button
                                                key={type.name}
                                                onClick={() => setSelectedType(type.name)}
                                                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${isSelected
                                                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                                                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} strokeWidth={1.5} />
                                                <span className="text-xs font-medium text-center">{type.name}</span>
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
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="e.g. 24"
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                        m²
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={handleAddRoom}
                                className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Add Room
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

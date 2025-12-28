import React, { createContext, useState, useContext, useEffect } from 'react';

// Import Assets
import officeImg from '../assets/icon/ChucNangWeb/office.png';
import livingRoomImg from '../assets/icon/ChucNangWeb/Living room.png';
import bedroomImg from '../assets/icon/ChucNangWeb/Bedroom.png';
import kitchenImg from '../assets/icon/ChucNangWeb/Kitchen.png';
import bathroomImg from '../assets/icon/ChucNangWeb/Bathroom.png';
import anh1 from '../assets/icon/ChucNangWeb/anh1.png';

const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
    // Initial Mock Data
    const [user, setUser] = useState({
        name: "Scarlett",
        avatar: anh1,
        email: "scarlett@example.com"
    });

    const [spaces, setSpaces] = useState([]);

    const [currentSpace, setCurrentSpace] = useState(null);

    const [rooms, setRooms] = useState([]);

    const [devices, setDevices] = useState([
        { id: 1, name: "Smart Lamp", type: "light", roomId: 1, status: "on", brightness: 80, color: "#FFA500" },
        { id: 2, name: "Speaker", type: "speaker", roomId: 1, status: "playing", volume: 45 },
        { id: 3, name: "Air Conditioner", type: "ac", roomId: 2, status: "off", temp: 24 },
        { id: 4, name: "Wi-Fi Router", type: "wifi", roomId: 3, status: "on" },
        { id: 5, name: "Humidifier", type: "humidifier", roomId: 3, status: "off" }
    ]);

    const [statistics, setStatistics] = useState({
        weeklyUsage: [
            { day: 'Mon', kw: 12 },
            { day: 'Tue', kw: 18 },
            { day: 'Wed', kw: 10 },
            { day: 'Thu', kw: 15 },
            { day: 'Fri', kw: 22 },
            { day: 'Sat', kw: 28 },
            { day: 'Sun', kw: 20 },
        ],
        totalLoss: 450 // KW
    });

    const addSpace = (space) => {
        setSpaces([...spaces, { ...space, id: Date.now() }]);
    };

    const addDevice = (device) => {
        setDevices([...devices, { ...device, id: Date.now() }]);
    };

    const updateDevice = (id, updates) => {
        setDevices(devices.map(d => d.id === id ? { ...d, ...updates } : d));
    };

    const removeDevice = (id) => {
        setDevices(devices.filter(d => d.id !== id));
    };

    const value = {
        user,
        spaces,
        currentSpace,
        setCurrentSpace,
        rooms,
        devices,
        statistics,
        addSpace,
        addDevice,
        updateDevice,
        removeDevice
    };

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    );
};

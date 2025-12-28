import React, { createContext, useContext, useState } from 'react';
import { INITIAL_SPACES, MOCK_USER } from '../data/mockData';

const MockContext = createContext();

export const MockProvider = ({ children }) => {
    const [user, setUser] = useState(MOCK_USER);
    const [spaces, setSpaces] = useState(INITIAL_SPACES);
    const [currentSpaceId, setCurrentSpaceId] = useState(INITIAL_SPACES[0].id);

    // Helper to get current space
    const currentSpace = spaces.find(s => s.id === currentSpaceId) || spaces[0];

    // Action: Toggle Device State
    const toggleDevice = (spaceId, roomId, deviceId) => {
        setSpaces(prevSpaces => prevSpaces.map(space => {
            if (space.id !== spaceId) return space;
            return {
                ...space,
                rooms: space.rooms.map(room => {
                    if (room.id !== roomId) return room;
                    return {
                        ...room,
                        devices: room.devices.map(device => {
                            if (device.id !== deviceId) return device;

                            // LOGIC FOR REAL DEVICE
                            if (device.isReal) {
                                const newStatus = !device.isOn;
                                console.log(`[REAL DEVICE] Toggling Smart Plug to: ${newStatus ? 'ON' : 'OFF'}`);

                                // TODO: Replace with actual ESP8266/ESP32 IP address
                                // fetch(`http://192.168.1.XXX/switch?state=${newStatus ? 'on' : 'off'}`)
                                //   .catch(err => console.error("Failed to toggle real device:", err));
                            }

                            return { ...device, isOn: !device.isOn };
                        })
                    };
                })
            };
        }));
    };

    const value = {
        user,
        spaces,
        currentSpace,
        setCurrentSpaceId,
        toggleDevice
    };

    return (
        <MockContext.Provider value={value}>
            {children}
        </MockContext.Provider>
    );
};

export const useMockData = () => {
    const context = useContext(MockContext);
    if (!context) {
        throw new Error('useMockData must be used within a MockProvider');
    }
    return context;
};

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../contexts/MockContext';
import { ArrowLeft, Lightbulb, Wind, Zap, Tv } from 'lucide-react';
import { DEVICE_TYPES } from '../data/mockData';

const RoomDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentSpace, toggleDevice } = useMockData();

    // Find Logic
    // In mock data, roomId is string 'room_01' etc.
    // Ensure we match correctly.
    const room = currentSpace.rooms.find(r => r.id === id);

    if (!room) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>Room not found</h2>
                <button
                    onClick={() => navigate('/rooms')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'var(--accent-blue)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer'
                    }}
                >
                    Back to Rooms
                </button>
            </div>
        );
    }

    const { devices } = room;

    const getDeviceIcon = (type) => {
        switch (type) {
            case DEVICE_TYPES.LIGHT: return <Lightbulb size={40} className="text-yellow-500" />;
            case DEVICE_TYPES.FAN: return <Wind size={40} className="text-blue-400" />;
            case DEVICE_TYPES.PLUG: return <Zap size={40} className="text-purple-500" />;
            case DEVICE_TYPES.TV: return <Tv size={40} className="text-gray-500" />;
            case DEVICE_TYPES.AC: return <Wind size={40} className="text-cyan-500" />;
            default: return <Zap size={40} className="text-gray-400" />;
        }
    };

    return (
        <div>
            {/* Header with Back Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                >
                    <ArrowLeft size={20} color="#1e293b" />
                </button>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{room.name}</h1>
                    <p style={{ color: 'var(--text-light)' }}>{devices.length} Devices installed</p>
                </div>
            </div>

            {/* Devices Grid - Reusing same style as Dashboard for consistency */}
            <div className="devices-grid">
                {devices.map(device => (
                    <div
                        className="device-card"
                        key={device.id}
                        style={{ cursor: device.isReal ? 'pointer' : 'default' }}
                        onClick={(e) => {
                            // Navigate to details if it's the Real device and NOT clicking the switch
                            if (device.isReal && !e.target.closest('.switch')) {
                                navigate(`/rooms/${room.id}/device/${device.id}`);
                            }
                        }}
                    >
                        <div className="device-img-container">
                            {getDeviceIcon(device.type)}
                        </div>
                        <div className="device-footer">
                            <div className="device-meta">
                                <h3>{device.name.replace('(Relay)', '')}</h3>
                                <p>{device.isOn ? 'Active' : 'Inactive'}</p>
                            </div>
                            <label className="switch" onClick={(e) => e.stopPropagation()}>
                                <input
                                    type="checkbox"
                                    checked={device.isOn}
                                    onChange={() => toggleDevice(currentSpace.id, room.id, device.id)}
                                    disabled={!device.isReal && device.isDimmed}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomDetail;

import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMockData } from '../contexts/MockContext';
import { ArrowLeft, Power, Zap, Clock, Activity } from 'lucide-react';

const DeviceDetail = () => {
    const { id } = useParams(); // deviceId
    const navigate = useNavigate();
    const { currentSpace, toggleDevice } = useMockData();
    const location = useLocation();

    // Find Device Logic
    // Flatten logic again to find device by ID
    let foundDevice = null;
    let foundRoom = null;

    for (const room of currentSpace.rooms) {
        const d = room.devices.find(dev => dev.id === id);
        if (d) {
            foundDevice = d;
            foundRoom = room;
            break;
        }
    }

    if (!foundDevice) {
        return <div style={{ padding: '2rem' }}>Device not found. <button onClick={() => navigate(-1)}>Back</button></div>;
    }

    const { isOn, isReal } = foundDevice;

    return (
        <div>
            {/* Header */}
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
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{foundDevice.name.replace('(Relay)', '')}</h1>
                    <p style={{ color: 'var(--text-light)' }}>{foundRoom?.name} • {isReal ? 'Real Device' : 'Simulated'}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Control Panel */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div
                        onClick={() => toggleDevice(currentSpace.id, foundRoom.id, foundDevice.id)}
                        style={{
                            width: '160px',
                            height: '160px',
                            borderRadius: '50%',
                            background: isOn ? 'var(--accent-blue)' : '#f1f5f9',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: isOn ? '0 10px 25px -5px rgba(59, 130, 246, 0.5)' : 'none',
                            transition: 'all 0.3s ease',
                            marginBottom: '1.5rem'
                        }}
                    >
                        <Power size={64} color={isOn ? 'white' : '#94a3b8'} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: isOn ? 'var(--accent-blue)' : '#64748b' }}>
                        {isOn ? 'ON' : 'OFF'}
                    </h2>
                    <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Click circle to toggle</p>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '12px' }}>
                            <Zap size={24} className="text-blue-500" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Power Consumption</p>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{isOn ? '450 W' : '0 W'}</h3>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '12px' }}>
                            <Activity size={24} className="text-green-500" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Current Status</p>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{isOn ? 'Active' : 'Standby'}</h3>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div style={{ background: '#fff7ed', padding: '1rem', borderRadius: '12px' }}>
                            <Clock size={24} className="text-orange-500" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Running Time</p>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>2h 45m</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reuse the Chart CSS for a mini chart if needed, or keep it simple as requested */}
            <div style={{ marginTop: '2rem' }}>
                {/*  Optional: Mini graph or logs */}
                {/* For now keeping it cleaner as user focus was on "Graph + Controls" which are essentially the Controls + Stats above */}
            </div>
        </div>
    );
};

export default DeviceDetail;

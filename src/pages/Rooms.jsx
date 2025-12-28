import React from 'react';
import { useMockData } from '../contexts/MockContext';
import { useNavigate } from 'react-router-dom';
import { Bed, Armchair, Utensils, Bath, Search } from 'lucide-react';

const Rooms = () => {
    const { currentSpace } = useMockData();
    const navigate = useNavigate();

    // Icon Strategy for Rooms
    const getRoomIcon = (name) => {
        if (name.includes('Living')) return <Armchair size={32} className="text-blue-500" />;
        if (name.includes('Bed')) return <Bed size={32} className="text-purple-500" />;
        if (name.includes('Kitchen')) return <Utensils size={32} className="text-orange-500" />;
        if (name.includes('Bath')) return <Bath size={32} className="text-cyan-500" />;
        return <Armchair size={32} className="text-gray-500" />;
    };

    return (
        <div>
            {/* Header with Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Rooms</h1>
                    <p style={{ color: 'var(--text-light)' }}>{currentSpace.rooms.length} rooms available</p>
                </div>
                <div style={{
                    background: 'white',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}>
                    <Search size={20} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search room..."
                        style={{ border: 'none', outline: 'none', fontSize: '1rem', width: '200px' }}
                    />
                </div>
            </div>

            {/* Rooms Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {currentSpace.rooms.map(room => (
                    <div
                        key={room.id}
                        onClick={() => navigate(`/rooms/${room.id}`)}
                        style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: '#f1f5f9',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.5rem'
                        }}>
                            {getRoomIcon(room.name)}
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-dark)' }}>{room.name}</h3>
                            <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>{room.devices.length} Devices</p>
                        </div>

                        <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Temperature</span>
                                <span style={{ fontWeight: 600 }}>24°C</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Humidity</span>
                                <span style={{ fontWeight: 600 }}>45%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;

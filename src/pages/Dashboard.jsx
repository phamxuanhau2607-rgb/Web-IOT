import { useMockData } from '../contexts/MockContext';
import { DEVICE_TYPES } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

// Icons using Lucide to match the design style
import { Lightbulb, Mic2, Tv, Wind, Zap } from 'lucide-react';
// Or we can import images if we had them. The user used CSSPicker images.
// I'll stick to icons for stability unless I want to hotlink external images (risky).
// Let's use simple logic to pick icons.

const Dashboard = () => {
    const { currentSpace, toggleDevice } = useMockData();
    const navigate = useNavigate();

    // Flatten devices
    const allDevices = currentSpace.rooms.flatMap(room =>
        room.devices.map(d => ({ ...d, roomId: room.id, roomName: room.name }))
    );

    // Dynamic Icon Strategy
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
            {/* Top Banner (Header) */}
            <header className="top-banner">
                <div className="banner-header">
                    <h1>Spaces</h1>
                    <div className="home-selector">
                        {/* Placeholder Home Image */}
                        <div style={{ width: 24, height: 24, background: '#ccc', borderRadius: 4 }}></div>
                        <span>{currentSpace.name}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                </div>

                <div className="status-cards">
                    <div className="status-card">
                        <div className="status-icon weather">☀️</div>
                        <div className="status-info">
                            <span className="label">Weather</span>
                            <span class="value">Sunny</span>
                        </div>
                    </div>
                    <div className="status-card">
                        <div className="status-icon humidity">💧</div>
                        <div className="status-info">
                            <span className="label">Humidity</span>
                            <span className="value">45%</span>
                        </div>
                    </div>
                    <div className="status-card highlight">
                        <div className="status-icon bulb">💡</div>
                        <div className="status-info">
                            <span className="label">Active Devices</span>
                            <span className="value">{allDevices.filter(d => d.isOn).length} On</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Devices Section */}
            <section className="devices-section">
                <div className="section-header">
                    <h2>Your Devices <span className="count">{allDevices.length}</span></h2>
                </div>

                <div className="devices-grid">
                    {allDevices.map(device => (
                        <div
                            className="device-card"
                            key={device.id}
                            style={{ cursor: device.isReal ? 'pointer' : 'default' }}
                            onClick={(e) => {
                                // Navigate to details if it's the Real device and NOT clicking the switch
                                if (device.isReal && !e.target.closest('.switch')) {
                                    navigate(`/rooms/${device.roomId}/device/${device.id}`);
                                }
                            }}
                        >
                            <div className="device-img-container">
                                {getDeviceIcon(device.type)}
                            </div>
                            <div className="device-footer">
                                <div className="device-meta">
                                    <h3>{device.name.replace('(Relay)', '')}</h3>
                                    <p>{device.roomName}</p>
                                </div>
                                <label className="switch" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        checked={device.isOn}
                                        onChange={() => toggleDevice(currentSpace.id, device.roomId, device.id)}
                                        // Disable if not "Real" to enforce the "Only one active" rule visually 
                                        // OR allow toggling internal state but user said "others dimmed". 
                                        // The css opacity logic (dimming) should be applied if needed.
                                        // User logic: "1 device active (Relay), others dimmed/disabled"
                                        disabled={!device.isReal && device.isDimmed}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom Row (Members & Map) - Keeping static as per design snippet */}
            <div className="bottom-row">
                <div className="members-card">
                    <h3>Members</h3>
                    <div className="avatar-group">
                        {/* Static Avatars */}
                        <div className="add-member">+</div>
                    </div>
                </div>
                <div className="map-card">
                    <div className="map-info">
                        <h3>Your space map</h3>
                        <p>See your rooms and all the devices that are related to them.</p>
                    </div>
                    <div className="map-graphic">
                        {/* SVG Map Placehoder */}
                        <svg width="80" height="60" viewBox="0 0 80 60">
                            <rect x="5" y="5" width="40" height="30" fill="none" stroke="#fbbf24" strokeWidth="1" />
                            <rect x="45" y="5" width="30" height="20" fill="none" stroke="#fbbf24" strokeWidth="1" />
                            <rect x="45" y="25" width="30" height="30" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../contexts/MockContext';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
// Recharts or similar is optional if I strictly follow the SVG path provided in HTML.
// User provided an SVG path in HTML: <path d="M0,150 C100,150 ... " />
// I will replicate this SVG structure but maybe make it dynamic if possible, 
// OR just use the static SVG for now as "Chart Refactor" implies visual matching first.
// However, the user DID mention: "Hiện tại đang fake số nhảy nhảy để demo" previously.
// I should probably overlay the real data ON TOP of this design or use Recharts to mimic it?
// The user said: "Statistics màn hình số liệu style cũng khá xấu, tôi sẽ gửi lại style sau khi ta sửa lại luồng chính" -> which is NOW.
// User request: "Refactor Statistics to match provided HTML/CSS".
// I will implement the HTML structure provided, essentially "Statics V2".

// I will re-integrate the "Fluctuation" logic but formatted into the new "stats-header" / "summary-card" structure.

const Statistics = () => {
    const navigate = useNavigate();
    const { currentSpace } = useMockData();

    // Simulation Data
    const [powerUsage, setPowerUsage] = useState(50);
    const [voltage, setVoltage] = useState(220);

    useEffect(() => {
        const interval = setInterval(() => {
            setPowerUsage(prev => {
                const change = (Math.random() - 0.5) * 5;
                return parseFloat((prev + change).toFixed(1));
            });
            setVoltage(prev => {
                const change = (Math.random() - 0.5) * 2;
                return parseFloat((220 + change).toFixed(1));
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* Stats Container (Dark Block) */}
            <div className="stats-container">
                <div className="stats-header">
                    <div className="title-group">
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <p className="subtitle">Statistics</p>
                            <h2>Electricity Usage</h2>
                        </div>
                    </div>
                    <div className="time-filters">
                        <button>Today</button>
                        <button className="active">Week</button>
                        <button>Month</button>
                        <button>Year</button>
                        <button>Quarter</button>
                    </div>
                </div>

                <div className="chart-section">
                    <div className="chart-main">
                        <div className="y-axis">
                            <span>20 kW</span>
                            <span>15 kW</span>
                            <span>10 kW</span>
                            <span>5 kW</span>
                            <span>0 kW</span>
                        </div>
                        <div className="chart-area">
                            <div className="grid-lines">
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>
                            {/* Static SVG for design match, can be made dynamic later with Recharts */}
                            <svg className="usage-line" viewBox="0 0 800 200" preserveAspectRatio="none">
                                <path d="M0,150 C100,150 150,80 200,100 C250,120 300,130 350,110 C400,90 450,20 500,30 C550,40 600,120 650,110 C700,100 750,130 800,150" fill="none" stroke="#3b82f6" strokeWidth="3" />
                                <circle cx="500" cy="30" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                            </svg>
                            <div className="tooltip" style={{ left: '60%', top: '-10px' }}>{powerUsage} kW</div>
                            <div className="active-column" style={{ left: '60%' }}></div>
                        </div>
                        <div className="x-axis">
                            <span>M</span>
                            <span>T</span>
                            <span>W</span>
                            <span className="active">T</span>
                            <span>F</span>
                            <span>S</span>
                            <span>S</span>
                        </div>
                    </div>

                    <div className="stats-sidebar">
                        <div className="summary-card">
                            <p>This Week</p>
                            <h3>{powerUsage} kW</h3>
                            <span className="trend up">
                                <TrendingUp size={12} />
                                +7.45%
                            </span>
                        </div>
                        <div className="summary-card">
                            <p>Voltage Stability</p>
                            <h3>{voltage} V</h3>
                            <span className="trend down">
                                <TrendingDown size={12} />
                                -0.5%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rooms Section inside Statistics */}
            <section className="rooms-section">
                <div className="section-header">
                    <h2>Your Rooms <span className="count">{currentSpace.rooms.length}</span></h2>
                </div>
                <div className="rooms-grid">
                    {currentSpace.rooms.map(room => (
                        <div className="room-card" key={room.id} onClick={() => navigate(`/rooms/${room.id}`)} style={{ cursor: 'pointer' }}>
                            <div className="room-img">
                                {/* Using room image from mock or placeholder if missing */}
                                <img src={room.image || `https://csspicker.dev/api/image/?q=${room.name}&image_type=photo`} alt={room.name} />
                            </div>
                            <div className="room-info">
                                <div className="room-meta">
                                    <h4>{room.name}</h4>
                                    <span className="device-count">
                                        <span className="dot"></span> {room.devices.length} devices
                                    </span>
                                </div>
                                <div className="room-usage">{(Math.random() * 10 + 5).toFixed(1)} kW</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Statistics;

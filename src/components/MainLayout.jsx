import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useMockData } from '../contexts/MockContext';
import { Home, Box as BoxIcon, Smartphone, Users, BarChart2, Settings, LogOut } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick, disabled }) => (
    <div
        className={`nav-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={!disabled ? onClick : undefined}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
        <Icon size={20} strokeWidth={2} />
        {label}
    </div>
);

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useMockData();

    // Active State Logic
    const getActive = (path) => {
        // Spaces (Dashboard)
        if (path === '/dashboard' && location.pathname === '/dashboard') return true;
        // Rooms
        if (path === '/rooms' && location.pathname.startsWith('/rooms') && !location.pathname.includes('/device/')) return true;
        // Devices Highlight Rule: Highlight if URL contains 'device' (Detail View)
        if (path === '/link-devices') {
            return location.pathname.includes('/device/');
        }
        // Strict match for others
        return location.pathname === path;
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span>smarthouse</span>
                </div>

                <div className="user-profile">
                    <img src={user?.avatar} alt={user?.name} />
                    <div className="user-info">
                        <span className="welcome">Welcome home,</span>
                        <span className="name">{user?.name}</span>
                    </div>
                </div>

                <nav className="nav-menu">
                    <SidebarItem
                        icon={BoxIcon}
                        label="Spaces"
                        active={getActive('/dashboard')}
                        onClick={() => navigate('/dashboard')}
                    />
                    <SidebarItem
                        icon={Home}
                        label="Rooms"
                        active={getActive('/rooms')}
                        onClick={() => navigate('/rooms')}
                    />
                    {/* Devices: Active if viewing a Device Detail, but NOT clickable to navigate unless implemented */}
                    <SidebarItem
                        icon={Smartphone}
                        label="Devices"
                        active={getActive('/link-devices')}
                        onClick={() => { /* User requested "không bấm vào được", just visual highlight */ }}
                        disabled={false} // It's "clickable" in UI sense but does nothing, or we disable click handler
                    />
                    {/* Members: Visible but DISABLED (cannot click) */}
                    <SidebarItem
                        icon={Users}
                        label="Members"
                        active={false}
                        onClick={() => { }}
                        disabled={true}
                    />
                    <SidebarItem
                        icon={BarChart2}
                        label="Statistics"
                        active={getActive('/statistics')}
                        onClick={() => navigate('/statistics')}
                    />
                </nav>

                <div className="sidebar-footer">
                    <SidebarItem
                        icon={Settings}
                        label="Profile & Settings"
                        active={getActive('/profile')}
                        onClick={() => navigate('/profile')}
                    />
                    <div className="nav-item logout" onClick={() => navigate('/login')}>
                        <LogOut size={20} strokeWidth={2} />
                        Log out
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;

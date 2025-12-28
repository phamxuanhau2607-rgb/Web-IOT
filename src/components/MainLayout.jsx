import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, IconButton, InputBase, Badge } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Devices as DevicesIcon, Settings as SettingsIcon, Dashboard as DashboardIcon, BarChart as BarChartIcon, Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useHome } from '../contexts/HomeContext';

const DRAWER_WIDTH = 260;

const SidebarItem = ({ icon, label, path, active, onClick }) => (
    <ListItem
        button
        onClick={onClick}
        sx={{
            my: 0.5,
            mx: 2,
            borderRadius: 3,
            backgroundColor: active ? '#4FD1C5' : 'transparent',
            color: active ? '#fff' : '#A0AEC0',
            '&:hover': {
                backgroundColor: active ? '#4FD1C5' : 'rgba(0, 0, 0, 0.04)',
            },
            transition: 'all 0.2s ease-in-out',
        }}
    >
        <ListItemIcon sx={{ color: active ? '#fff' : '#A0AEC0', minWidth: 40 }}>
            {icon}
        </ListItemIcon>
        <ListItemText
            primary={label}
            primaryTypographyProps={{
                fontWeight: active ? 600 : 500,
                fontSize: '0.95rem'
            }}
        />
    </ListItem>
);

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useHome();

    const menuItems = [
        { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { label: 'Spaces', icon: <HomeIcon />, path: '/spaces' }, // TBD
        { label: 'Devices', icon: <DevicesIcon />, path: '/link-devices' },
        { label: 'Statistics', icon: <BarChartIcon />, path: '/statistics' },
        { label: 'Profile', icon: <SettingsIcon />, path: '/profile' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F7FAFC' }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                        bgcolor: '#FFFFFF',
                        boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
                    },
                }}
            >
                <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 40, height: 40, bgcolor: '#4FD1C5', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Logo Placeholder */}
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>H</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#2D3748' }}>
                        Smart Home
                    </Typography>
                </Box>

                <List sx={{ px: 0 }}>
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                            active={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                        />
                    ))}
                </List>

                <Box sx={{ mt: 'auto', p: 4 }}>
                    <Box sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: '#F7FAFC',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <Avatar src={user?.avatar} alt={user?.name} sx={{ width: 40, height: 40 }} />
                        <Box>
                            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#2D3748' }}>
                                {user?.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#A0AEC0' }}>
                                {user?.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Drawer>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: 4, width: `calc(100% - ${DRAWER_WIDTH}px)` }}>
                {/* Topbar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: '#2D3748', mb: 1 }}>
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Overview'}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#A0AEC0' }}>
                            Welcome back, {user?.name}!
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            bgcolor: '#fff',
                            borderRadius: 3,
                            p: '8px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            width: 300
                        }}>
                            <SearchIcon sx={{ color: '#A0AEC0', mr: 1 }} />
                            <InputBase placeholder="Search..." fullWidth sx={{ fontSize: '0.95rem' }} />
                        </Box>

                        <IconButton sx={{ bgcolor: '#fff', p: 1.5, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                            <Badge variant="dot" color="error">
                                <NotificationsIcon sx={{ color: '#A0AEC0' }} />
                            </Badge>
                        </IconButton>
                    </Box>
                </Box>

                {/* Page Content */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;

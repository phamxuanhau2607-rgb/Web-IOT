import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Avatar, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'; // Spaces
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'; // Rooms
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'; // Devices
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'; // Members
import BarChartIcon from '@mui/icons-material/BarChart'; // Statistics
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import logo from '../../assets/icon/ChucNangWeb/logo.png';
import avatar from '../../assets/icon/ChucNangWeb/anh1.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const drawerWidth = 280;

    const menuItems = [
        { text: 'Spaces', icon: <DashboardOutlinedIcon />, path: '/spaces' },
        { text: 'Rooms', icon: <MeetingRoomOutlinedIcon />, path: '/rooms' },
        { text: 'Devices', icon: <LightbulbOutlinedIcon />, path: '/link-devices' },
        { text: 'Members', icon: <PeopleOutlineIcon />, path: '/members' },
        { text: 'Statistics', icon: <BarChartIcon />, path: '/statistics' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: '1px solid #f0f0f0',
                },
            }}
        >
            {/* 1. Logo Section */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <img src={logo} alt="SmartHouse Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
                <Typography variant="h6" fontWeight="bold" color="text.primary">smarthouse</Typography>
            </Box>

            {/* 2. User Info */}
            <Box sx={{ px: 3, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={avatar} sx={{ width: 48, height: 48, border: '2px solid white', boxShadow: 1 }} />
                <Box>
                    <Typography variant="caption" color="text.secondary">Welcome home,</Typography>
                    <Typography variant="subtitle1" fontWeight="bold">Kristin</Typography>
                </Box>
            </Box>

            {/* 3. Menu Items */}
            <List sx={{ px: 2 }}>
                {menuItems.map((item) => {
                    const active = location.pathname.includes(item.path); // Logic active đơn giản
                    return (
                        <ListItemButton
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            sx={{
                                borderRadius: 3,
                                mb: 1,
                                bgcolor: active ? '#EBF5FF' : 'transparent',
                                color: active ? '#007BFF' : 'text.secondary',
                                '&:hover': { bgcolor: active ? '#EBF5FF' : '#F4F7FA' },
                            }}
                        >
                            <ListItemIcon sx={{ color: active ? '#007BFF' : 'inherit', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: active ? 600 : 400 }} />
                        </ListItemButton>
                    );
                })}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            {/* 4. Footer Settings */}
            <Divider sx={{ mx: 3, my: 2 }} />
            <List sx={{ px: 2, pb: 3 }}>
                <ListItemButton sx={{ borderRadius: 3, color: 'text.secondary' }}>
                    <ListItemIcon sx={{ minWidth: 40 }}><SettingsOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Profile & Settings" />
                </ListItemButton>
                <ListItemButton sx={{ borderRadius: 3, color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                    <ListItemIcon sx={{ minWidth: 40 }}><LogoutOutlinedIcon /></ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Sidebar;
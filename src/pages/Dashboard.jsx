import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, AvatarGroup, Button } from '@mui/material';
import { useHome } from '../contexts/HomeContext';
import { useNavigate } from 'react-router-dom';
import EmptySpace from './EmptySpace';

// Import Icons/Images
import livingRoomImg from '../assets/icon/ChucNangWeb/Living room.png';
import bedroomImg from '../assets/icon/ChucNangWeb/Bedroom.png';
import kitchenImg from '../assets/icon/ChucNangWeb/Kitchen.png';
import bathroomImg from '../assets/icon/ChucNangWeb/Bathroom.png';
import smartLampImg from '../assets/icon/ChucNangWeb/Smart Lamp.png';
import airConditionerImg from '../assets/icon/ChucNangWeb/Air Conditioner.png';
import humidifierImg from '../assets/icon/ChucNangWeb/Humidifier icon.png';
import speakerImg from '../assets/icon/ChucNangWeb/Speaker.png';

const Dashboard = () => {
    const { currentSpace } = useHome(); // Assuming Basic Context
    const navigate = useNavigate();

    // Mock Data based on Assets
    const rooms = [
        { id: 1, name: 'Living Room', devices: 5, image: livingRoomImg },
        { id: 2, name: 'Bedroom', devices: 3, image: bedroomImg },
        { id: 3, name: 'Kitchen', devices: 4, image: kitchenImg },
        { id: 4, name: 'Bathroom', devices: 2, image: bathroomImg },
    ];

    const popularDevices = [
        { id: 1, name: 'Smart Lamp', status: 'On', image: smartLampImg, color: '#FFD700' },
        { id: 2, name: 'Air Conditioner', status: '24°C', image: airConditionerImg, color: '#4FD1C5' },
        { id: 3, name: 'Humidifier', status: 'Off', image: humidifierImg, color: '#63B3ED' },
        { id: 4, name: 'Speaker', status: 'Playing', image: speakerImg, color: '#F687B3' },
    ];

    if (!currentSpace) {
        return <EmptySpace />;
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Header Section with Current Space Card */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                    color: 'white',
                    mb: 5,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                {/* Decorative Circles */}
                <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                <Box sx={{ position: 'absolute', bottom: -30, left: 50, width: 100, height: 100, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />

                <Box sx={{ zIndex: 1 }}>
                    <Typography variant="body2" sx={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1, mb: 1 }}>
                        Current Space
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                        {currentSpace.name}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                        {currentSpace.address}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">{rooms.length}</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>Rooms</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">{popularDevices.length}</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>Devices</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">{currentSpace.members || 3}</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>Members</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Right Side: Members & Action */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, zIndex: 1 }}>
                    <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 45, height: 45, border: '2px solid rgba(255,255,255,0.2)' } }}>
                        <Avatar alt="Member 1" src="https://i.pravatar.cc/150?u=1" />
                        <Avatar alt="Member 2" src="https://i.pravatar.cc/150?u=2" />
                        <Avatar alt="Member 3" src="https://i.pravatar.cc/150?u=3" />
                    </AvatarGroup>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            textTransform: 'none',
                            backdropFilter: 'blur(10px)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                        }}
                        onClick={() => navigate('/spaces')}
                    >
                        Manage Space
                    </Button>
                </Box>
            </Paper>

            {/* Rooms Section */}
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#2D3748', mb: 3 }}>
                Your Rooms
            </Typography>
            <Grid container spacing={3} sx={{ mb: 5 }}>
                {rooms.map((room) => (
                    <Grid item xs={12} sm={6} md={3} key={room.id}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                            onClick={() => navigate('/rooms')}
                        >
                            <Box
                                component="img"
                                src={room.image}
                                alt={room.name}
                                sx={{ width: 80, height: 80, objectFit: 'contain', mb: 2 }}
                            />
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#2D3748' }}>{room.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{room.devices} Devices</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Popular Devices Section */}
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#2D3748', mb: 3 }}>
                Popular Devices
            </Typography>
            <Grid container spacing={3}>
                {popularDevices.map((device) => (
                    <Grid item xs={12} sm={6} md={3} key={device.id}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                '&:hover': { boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }
                            }}
                            onClick={() => navigate('/devices')}
                        >
                            <Box
                                sx={{
                                    width: 60, height: 60,
                                    borderRadius: 3,
                                    bgcolor: `${device.color}20`, // Light opacity background
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <Box component="img" src={device.image} alt={device.name} sx={{ width: 40, height: 40, objectFit: 'contain' }} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#2D3748' }}>{device.name}</Typography>
                                <Typography
                                    variant="caption"
                                    fontWeight="bold"
                                    sx={{
                                        color: device.status === 'On' ? 'success.main' : device.status === 'Off' ? 'text.secondary' : 'primary.main',
                                        bgcolor: device.status === 'On' ? '#E6FFFA' : device.status === 'Off' ? '#EDF2F7' : '#EBF8FF',
                                        px: 1, py: 0.5, borderRadius: 1
                                    }}
                                >
                                    {device.status}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;

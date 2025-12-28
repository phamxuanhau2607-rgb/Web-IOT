import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { ViewList, Map, Thermostat, Opacity, Devices, CloudUpload } from '@mui/icons-material';
import { useHome } from '../contexts/HomeContext';
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
    const { rooms } = useHome();
    const [view, setView] = useState('list');
    const navigate = useNavigate();

    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
            setView(nextView);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#2D3748' }}>
                    Rooms
                </Typography>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleViewChange}
                    sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                >
                    <ToggleButton value="list" sx={{ px: 3, border: 'none', '&.Mui-selected': { bgcolor: '#E6FFFA', color: '#319795' } }}>
                        <ViewList sx={{ mr: 1 }} /> List
                    </ToggleButton>
                    <ToggleButton value="map" sx={{ px: 3, border: 'none', '&.Mui-selected': { bgcolor: '#E6FFFA', color: '#319795' } }}>
                        <Map sx={{ mr: 1 }} /> Map
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {view === 'list' ? (
                <Grid container spacing={3}>
                    {rooms.map((room) => (
                        <Grid item xs={12} sm={6} md={4} key={room.id}>
                            <Paper
                                onClick={() => navigate(`/rooms/${room.id}`)}
                                sx={{
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
                                }}
                            >
                                <Box sx={{ height: 160, backgroundImage: `url(${room.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.3)' }} />
                                    <Typography variant="h6" fontWeight="bold" sx={{ position: 'absolute', bottom: 16, left: 16, color: 'white' }}>
                                        {room.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#718096' }}>
                                        <Devices fontSize="small" />
                                        <Typography variant="body2">{room.devices} Devices</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#E53E3E' }}>
                                            <Thermostat fontSize="small" />
                                            <Typography variant="body2">{room.temp}°C</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#3182CE' }}>
                                            <Opacity fontSize="small" />
                                            <Typography variant="body2">{room.humidity}%</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        minHeight: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#F7FAFC',
                        border: '2px dashed #CBD5E0'
                    }}
                >
                    <Map sx={{ fontSize: 80, color: '#CBD5E0', mb: 2 }} />
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        No Floor Plan Uploaded
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Upload a blueprint of your home to see device locations.
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<CloudUpload />}
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                        Upload Blueprint
                    </Button>
                </Paper>
            )}
        </Box>
    );
};

export default Rooms;

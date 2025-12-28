import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Switch, IconButton, Slider, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { ArrowBack, Thermostat, Opacity, Lightbulb, VolumeUp, Wifi, AcUnit, AccessTime } from '@mui/icons-material';
import { useHome } from '../contexts/HomeContext';

const RoomDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { rooms, devices, updateDevice } = useHome();

    // Schedule State
    const [openSchedule, setOpenSchedule] = useState(false);
    const [schedulingDevice, setSchedulingDevice] = useState(null);
    const [scheduleTime, setScheduleTime] = useState('07:00');

    // Find room and associated devices
    const room = rooms.find(r => r.id === parseInt(id));
    const roomDevices = devices.filter(d => d.roomId === parseInt(id));

    if (!room) {
        return <Typography>Room not found</Typography>;
    }

    const getDeviceIcon = (type) => {
        switch (type) {
            case 'light': return <Lightbulb />;
            case 'speaker': return <VolumeUp />;
            case 'ac': return <AcUnit />;
            case 'wifi': return <Wifi />;
            default: return <Lightbulb />;
        }
    };

    const handleOpenSchedule = (device) => {
        setSchedulingDevice(device);
        setScheduleTime(device.schedule || '07:00');
        setOpenSchedule(true);
    };

    const handleSaveSchedule = () => {
        if (schedulingDevice) {
            updateDevice(schedulingDevice.id, { schedule: scheduleTime });
            setOpenSchedule(false);
            setSchedulingDevice(null);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton onClick={() => navigate('/rooms')} sx={{ mr: 2, bgcolor: 'white', ml: -1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#2D3748' }}>
                    {room.name}
                </Typography>
            </Box>

            {/* Environmental Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#FFF5F5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#E53E3E', fontWeight: 600 }}>Temperature</Typography>
                            <Typography variant="h3" fontWeight="bold" sx={{ color: '#2D3748' }}>{room.temp}°c</Typography>
                        </Box>
                        <Thermostat sx={{ fontSize: 60, color: '#E53E3E', opacity: 0.2 }} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#E6FFFA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#319795', fontWeight: 600 }}>Humidity</Typography>
                            <Typography variant="h3" fontWeight="bold" sx={{ color: '#2D3748' }}>{room.humidity}%</Typography>
                        </Box>
                        <Opacity sx={{ fontSize: 60, color: '#319795', opacity: 0.2 }} />
                    </Paper>
                </Grid>
            </Grid>

            {/* Devices Section */}
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: '#2D3748' }}>Devices</Typography>

            <Grid container spacing={3}>
                {roomDevices.map((device) => (
                    <Grid item xs={12} md={6} lg={4} key={device.id}>
                        <Paper sx={{ p: 3, borderRadius: 3, transition: 'all 0.3s', '&:hover': { boxShadow: '0 10px 20px rgba(0,0,0,0.05)' } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: device.status === 'on' ? '#4FD1C5' : '#EDF2F7',
                                    color: device.status === 'on' ? 'white' : '#A0AEC0'
                                }}>
                                    {getDeviceIcon(device.type)}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {/* Schedule Button */}
                                    <IconButton size="small" onClick={() => handleOpenSchedule(device)} sx={{ color: device.schedule ? '#4FD1C5' : '#A0AEC0' }}>
                                        <AccessTime fontSize="small" />
                                    </IconButton>
                                    <Switch
                                        checked={device.status === 'on'}
                                        onChange={(e) => updateDevice(device.id, { status: e.target.checked ? 'on' : 'off' })}
                                        color="secondary"
                                    />
                                </Box>
                            </Box>

                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>{device.name}</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <span>{device.status === 'on' ? 'Active' : 'Inactive'}</span>
                                {device.schedule && <span style={{ color: '#4FD1C5', fontSize: '0.8rem' }}>Runs at {device.schedule}</span>}
                            </Typography>

                            {/* Specific Controls based on device type */}
                            {device.type === 'light' && (
                                <Box>
                                    <Typography variant="caption" color="textSecondary">Brightness</Typography>
                                    <Slider
                                        size="small"
                                        defaultValue={device.brightness || 50}
                                        sx={{ color: '#4FD1C5' }}
                                        onChangeCommitted={(_, val) => updateDevice(device.id, { brightness: val })}
                                    />
                                </Box>
                            )}
                            {device.type === 'speaker' && (
                                <Box>
                                    <Typography variant="caption" color="textSecondary">Volume</Typography>
                                    <Slider
                                        size="small"
                                        defaultValue={device.volume || 50}
                                        sx={{ color: '#4FD1C5' }}
                                        onChangeCommitted={(_, val) => updateDevice(device.id, { volume: val })}
                                    />
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Schedule Dialog */}
            <Dialog open={openSchedule} onClose={() => setOpenSchedule(false)} fullWidth maxWidth="xs">
                <DialogTitle>Set Schedule</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                        Set a daily time for <b>{schedulingDevice?.name}</b> to turn on.
                    </Typography>
                    <TextField
                        type="time"
                        fullWidth
                        variant="outlined"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSchedule(false)}>Cancel</Button>
                    <Button onClick={handleSaveSchedule} variant="contained" sx={{ bgcolor: '#4FD1C5' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RoomDetail;

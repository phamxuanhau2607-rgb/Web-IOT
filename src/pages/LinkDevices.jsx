import React, { useState } from "react";
import { Box, Typography, InputBase, Grid, IconButton, Paper, Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeviceCard from "../components/DeviceCard";
import { useNavigate } from "react-router-dom";
import { useHome } from "../contexts/HomeContext";

// Import Assets
import smartLampImg from '../assets/icon/ChucNangWeb/Smart Lamp.png';
import airConImg from '../assets/icon/ChucNangWeb/Air Conditioner.png';
import speakerImg from '../assets/icon/ChucNangWeb/Speaker.png';
import wifiImg from '../assets/icon/ChucNangWeb/Humidifier icon.png'; // Using humidifier as placeholder/wifi if needed or just generic
import tvImg from '../assets/icon/ChucNangWeb/Living room.png'; // Placeholder for TV if no specific icon

// Mock list of discoverable devices
const DISCOVERABLE_DEVICES = [
    { id: 101, name: "Smart Lamp Pro", type: 'light', image: smartLampImg, status: "not connected" },
    { id: 102, name: "Sonos Speaker", type: 'speaker', image: speakerImg, status: "not connected" },
    { id: 103, name: "LG AirCon", type: 'ac', image: airConImg, status: "not connected" },
    { id: 104, name: "Keen Humidifier", type: 'humidifier', image: wifiImg, status: "not connected" },
];

const LinkDevices = () => {
    const navigate = useNavigate();
    const { devices, addDevice, removeDevice, rooms } = useHome();
    const [searchTerm, setSearchTerm] = useState("");

    // Dialog State
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState("");

    // Merge discoverable with already connected devices to show status
    const getDeviceStatus = (devId) => {
        // If device ID exists in context devices, it's connected
        // Note: In real app, IDs would be unique GUIDs. Here we mock.
        return devices.some(d => d.id === devId) ? "connected" : "not connected";
    };

    const handleConnectClick = (device) => {
        // If already connected, we might want to disconnect?
        if (getDeviceStatus(device.id) === "connected") {
            // Find the real ID in context to remove
            // In this simple mock, we assume ID match. 
            // In reality, DISCOVERABLE has diff IDs from INSTALLED devices.
            // We'll skip complex logic and just say "Contact Support to unpair" or simple remove if ID matches.
            removeDevice(device.id);
        } else {
            setSelectedDevice(device);
            setOpenDialog(true);
        }
    };

    const handleConfirmConnect = () => {
        if (!selectedRoom) return;

        addDevice({
            id: selectedDevice.id, // Keep same ID for simplicity in mock
            name: selectedDevice.name,
            type: selectedDevice.type,
            roomId: selectedRoom,
            status: 'on',
            brightness: 50,
            volume: 30
        });

        setOpenDialog(false);
        setSelectedDevice(null);
        setSelectedRoom("");
    };

    const filteredDevices = DISCOVERABLE_DEVICES.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    p: 3,
                    mb: 4,
                    background: 'linear-gradient(135deg, #4FD1C5 0%, #319795 100%)',
                    color: 'white',
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight="bold">My Home</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Discover and link new devices</Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h4" fontWeight="bold">{devices.length}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>Connected Devices</Typography>
                </Box>
            </Paper>

            {/* Search Bar */}
            <Box sx={{
                bgcolor: "#fff", borderRadius: 3, p: "4px 16px", mb: 4,
                display: "flex", alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                border: "1px solid #EDF2F7",
                height: 56
            }}>
                <InputBase
                    placeholder="Search smart devices..."
                    fullWidth
                    sx={{ fontSize: "0.95rem", color: "#4A5568", ml: 1 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton sx={{ color: "#A0AEC0" }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* Grid of Devices */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: "#718096", mb: 1 }}>Nearby Devices</Typography>
            </Box>

            <Grid container spacing={3}>
                {filteredDevices.map((device) => {
                    const isConnected = getDeviceStatus(device.id) === "connected";
                    return (
                        <Grid item xs={12} sm={6} md={4} key={device.id}>
                            <Box onClick={() => handleConnectClick(device)} sx={{ cursor: 'pointer' }}>
                                <DeviceCard
                                    name={device.name}
                                    image={device.image}
                                    status={isConnected ? "connected" : "not connected"}
                                    isConnected={isConnected}
                                />
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Room Selection Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
                <DialogTitle>Add to Room</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Where is the <b>{selectedDevice?.name}</b> located?
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel>Select Room</InputLabel>
                        <Select
                            value={selectedRoom}
                            label="Select Room"
                            onChange={(e) => setSelectedRoom(e.target.value)}
                        >
                            {rooms.map(room => (
                                <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleConfirmConnect} disabled={!selectedRoom}>
                        Connect
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LinkDevices;
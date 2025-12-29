import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    Stack,
    Paper,
    Grid,
    InputAdornment,
    Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import MainLayout from "../components/MainLayout";

// Dữ liệu giả lập các thiết bị tìm thấy
const INITIAL_DEVICES = [
    { id: 1, name: "Smart Lamp", type: "Lamp", image: "https://cdn-icons-png.flaticon.com/512/2983/2983965.png", connected: true },
    { id: 2, name: "Aroma Diffuser", type: "Diffuser", image: "https://cdn-icons-png.flaticon.com/512/3556/3556828.png", connected: false },
    { id: 3, name: "Air Conditioner", type: "AC", image: "https://cdn-icons-png.flaticon.com/512/911/911409.png", connected: false },
    { id: 4, name: "Humidifier", type: "Humidifier", image: "https://cdn-icons-png.flaticon.com/512/3233/3233663.png", connected: false },
    { id: 5, name: "Speaker", type: "Speaker", image: "https://cdn-icons-png.flaticon.com/512/3050/3050212.png", connected: false },
    { id: 6, name: "Smart Lamp (Hall)", type: "Lamp", image: "https://cdn-icons-png.flaticon.com/512/2983/2983965.png", connected: false },
];

const CreateSpaceStep4 = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [devices, setDevices] = useState(INITIAL_DEVICES);

    // Hàm xử lý khi bấm nút + hoặc xóa
    const toggleDeviceConnection = (id) => {
        setDevices((prevDevices) =>
            prevDevices.map((device) =>
                device.id === id ? { ...device, connected: !device.connected } : device
            )
        );
    };

    // Lọc thiết bị theo thanh tìm kiếm
    const filteredDevices = devices.filter((device) =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MainLayout>
            <Box sx={{
                height: "calc(100vh - 64px)",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#F7FAFC"
            }}>

                {/* --- 1. HEADER SECTION --- */}
                <Box sx={{
                    bgcolor: "#1A202C",
                    color: "#fff",
                    p: 3,
                    pb: 10, // Padding đáy lớn để chừa chỗ cho Card "My Home" đè lên
                    position: "relative"
                }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <IconButton onClick={() => navigate(-1)} sx={{ color: "rgba(255,255,255,0.7)" }}>
                            <ArrowBackIcon />
                        </IconButton>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">Create a new space</Typography>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                                Connect your devices
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "right" }}>
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>Step</Typography>
                            <Typography variant="subtitle2" fontWeight="bold">4 | 7</Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* --- 2. FLOATING INFO CARD (My Home Summary) --- */}
                <Box sx={{ px: 3, mt: -6, zIndex: 10 }}>
                    <Paper elevation={2} sx={{
                        p: 2,
                        borderRadius: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/* Ảnh thu nhỏ của nhà */}
                            <Box sx={{
                                width: 60, height: 60, borderRadius: "12px",
                                backgroundImage: `url('https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80')`,
                                backgroundSize: "cover"
                            }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                                    My Home <EditIcon sx={{ fontSize: 16, ml: 1, color: "#007BFF", cursor: "pointer" }} />
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    11-5 Raddington Rd, London, UK
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Các chỉ số thống kê */}
                        <Stack direction="row" spacing={1}>
                            <Chip label="4 Rooms" size="small" sx={{ bgcolor: "#E6FFFA", color: "#38B2AC", fontWeight: 600 }} />
                            <Chip label={`${devices.filter(d => d.connected).length} Devices`} size="small" sx={{ bgcolor: "#EBF8FF", color: "#4299E1", fontWeight: 600 }} />
                            <Chip label="0 Members" size="small" sx={{ bgcolor: "#FAF5FF", color: "#9F7AEA", fontWeight: 600 }} />
                        </Stack>
                    </Paper>
                </Box>

                {/* --- 3. MAIN CONTENT (List Devices) --- */}
                <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Link smart devices</Typography>
                            <Typography variant="caption" color="text.secondary">Current devices nearby</Typography>
                        </Box>
                        <TextField
                            placeholder="Search"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#A0AEC0" }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ bgcolor: "#fff", borderRadius: "8px", width: 250 }}
                        />
                    </Stack>

                    {/* Grid hiển thị thiết bị */}
                    <Grid container spacing={2}>
                        {filteredDevices.map((device) => (
                            <Grid item xs={12} sm={6} md={4} key={device.id}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: "16px",
                                        border: device.connected ? "2px solid #007BFF" : "1px solid #E2E8F0",
                                        position: "relative",
                                        transition: "all 0.2s",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        height: 160,
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
                                        <img src={device.image} alt={device.name} style={{ height: 60, opacity: device.connected ? 1 : 0.6 }} />
                                    </Box>

                                    <Box sx={{ width: "100%", textAlign: "left" }}>
                                        <Typography variant="subtitle2" fontWeight="bold">{device.name}</Typography>
                                        <Typography variant="caption" sx={{ color: device.connected ? "#38B2AC" : "#A0AEC0", display: "flex", alignItems: "center" }}>
                                            {device.connected ? (
                                                <><CheckCircleIcon sx={{ fontSize: 12, mr: 0.5 }} /> connected</>
                                            ) : (
                                                "not connected"
                                            )}
                                        </Typography>
                                    </Box>

                                    {/* Action Button (Add or Remove) */}
                                    <IconButton
                                        onClick={() => toggleDeviceConnection(device.id)}
                                        sx={{
                                            position: "absolute",
                                            bottom: 12,
                                            right: 12,
                                            width: 36,
                                            height: 36,
                                            border: device.connected ? "1px solid #E2E8F0" : "none",
                                            bgcolor: device.connected ? "#fff" : "#EBF8FF",
                                            color: device.connected ? "#E53E3E" : "#007BFF", // Đỏ nếu xóa, Xanh nếu thêm
                                            "&:hover": {
                                                bgcolor: device.connected ? "#FFF5F5" : "#BEE3F8"
                                            }
                                        }}
                                    >
                                        {device.connected ? <DeleteOutlineIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                                    </IconButton>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* --- 4. FOOTER --- */}
                <Paper elevation={3} sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #E2E8F0"
                }}>
                    <Typography variant="caption" color="text.secondary">
                        Add all your devices and go to the next step.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        {/* Nút Skip màu xám nhạt */}
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#EDF2F7",
                                color: "#4A5568",
                                borderRadius: "12px",
                                textTransform: "none",
                                fontWeight: 600,
                                boxShadow: "none",
                                "&:hover": { bgcolor: "#E2E8F0", boxShadow: "none" }
                            }}
                        >
                            Skip
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => navigate("/create-space/summary")} // Giả định bước tiếp theo là tổng quan
                            sx={{
                                bgcolor: "#007BFF",
                                color: "#fff",
                                borderRadius: "12px",
                                px: 4,
                                textTransform: "none",
                                fontWeight: 600,
                                boxShadow: "none",
                                "&:hover": { bgcolor: "#0069D9", boxShadow: "none" }
                            }}
                        >
                            Continue
                        </Button>
                    </Stack>
                </Paper>

            </Box>
        </MainLayout>
    );
};

export default CreateSpaceStep4;
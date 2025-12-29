import React, { useState } from "react";
import {
    Box, Typography, Button, TextField, IconButton,
    Stack, Paper, Grid, InputAdornment, Chip, Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// --- ICONS ---
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChairIcon from '@mui/icons-material/Chair';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';

// --- COMPONENT & ASSETS ---
import MainLayout from "../components/MainLayout";
// Đảm bảo đường dẫn ảnh này đúng trong dự án của bạn
import emptyIllustration from "../assets/icon/ChucNangWeb/image (2).png";

// --- DỮ LIỆU MẪU (MOCK DATA) ---
const INITIAL_DEVICES = [
    { id: 1, name: "Smart Lamp", type: "Lamp", image: "https://cdn-icons-png.flaticon.com/512/2983/2983965.png", connected: true },
    { id: 2, name: "Aroma Diffuser", type: "Diffuser", image: "https://cdn-icons-png.flaticon.com/512/3556/3556828.png", connected: false },
    { id: 3, name: "Air Conditioner", type: "AC", image: "https://cdn-icons-png.flaticon.com/512/911/911409.png", connected: false },
    { id: 4, name: "Humidifier", type: "Humidifier", image: "https://cdn-icons-png.flaticon.com/512/3233/3233663.png", connected: false },
    { id: 5, name: "Speaker", type: "Speaker", image: "https://cdn-icons-png.flaticon.com/512/3050/3050212.png", connected: false },
    { id: 6, name: "Smart Lamp (Hall)", type: "Lamp", image: "https://cdn-icons-png.flaticon.com/512/2983/2983965.png", connected: false },
];

const ROOMS = [
    { id: 1, name: "Living Room", size: "20 m²", icon: <ChairIcon />, color: "#E6FFFA", iconColor: "#38B2AC" },
    { id: 2, name: "Kitchen", size: "12 m²", icon: <KitchenIcon />, color: "#FFFAF0", iconColor: "#DD6B20" },
    { id: 3, name: "Bedroom", size: "16 m²", icon: <BedIcon />, color: "#F7FAFC", iconColor: "#718096" },
    { id: 4, name: "Bathroom", size: "6 m²", icon: <BathtubIcon />, color: "#FFF5F5", iconColor: "#E53E3E" },
];

const MEMBERS = [
    { id: 1, name: "Albert Flores", email: "albert.flores@gmail.com", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: 2, name: "Annette Black", email: "annette.black@gmail.com", avatar: "https://i.pravatar.cc/150?img=5" },
];

const EmptySpace = () => {
    const navigate = useNavigate();

    // --- STATE QUẢN LÝ ---
    // step 0: Empty Screen (Màn hình bắt đầu)
    // step 1: Name House (Nhập tên)
    // step 2: Connect Devices (Chọn thiết bị)
    // step 3: Confirm (Xác nhận)
    const [step, setStep] = useState(0);

    const [houseName, setHouseName] = useState("My Home");
    const [searchTerm, setSearchTerm] = useState("");
    const [devices, setDevices] = useState(INITIAL_DEVICES);

    // --- HÀM XỬ LÝ ---
    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const toggleDeviceConnection = (id) => {
        setDevices((prevDevices) =>
            prevDevices.map((device) =>
                device.id === id ? { ...device, connected: !device.connected } : device
            )
        );
    };

    const filteredDevices = devices.filter((device) =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- PHẦN 1: GIAO DIỆN TRỐNG (Step 0) ---
    if (step === 0) {
        return (
            <MainLayout>
                <Box sx={{
                    minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "center", bgcolor: "#fff", p: 3, textAlign: "center"
                }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#2D3748", mb: 1, fontSize: "1.5rem" }}>
                        Looks like you have no spaces set up.
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#718096", mb: 6 }}>
                        Add your house and start your smart life!
                    </Typography>
                    <Box sx={{ width: "100%", maxWidth: 300, mb: 6 }}>
                        <img src={emptyIllustration} alt="No Spaces" style={{ width: "100%", height: "auto", display: "block" }} />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleNext} // Chuyển sang Step 1
                        sx={{
                            bgcolor: "#007BFF", color: "#fff", borderRadius: "12px", px: 6, py: 1.5,
                            textTransform: "none", fontSize: "1rem", fontWeight: 600, boxShadow: "none",
                            "&:hover": { bgcolor: "#0069D9", boxShadow: "none" }
                        }}
                    >
                        Set up your space
                    </Button>
                </Box>
            </MainLayout>
        );
    }

    // --- LAYOUT CHUNG CHO CÁC BƯỚC WIZARD (Step 1, 2, 3) ---
    return (
        <MainLayout>
            <Box sx={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", bgcolor: "#F7FAFC" }}>

                {/* HEADER XANH ĐẬM CHUNG */}
                <Box sx={{ bgcolor: "#1A202C", color: "#fff", p: 3, pb: step === 1 ? 4 : 10, position: "relative" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <IconButton onClick={handleBack} sx={{ color: "rgba(255,255,255,0.7)" }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">Create a new space</Typography>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                                {step === 1 ? "Add the first details" : step === 2 ? "Connect your devices" : "Confirm your choices"}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>Step</Typography>
                            <Typography variant="subtitle2" fontWeight="bold">
                                {step === 1 ? "1 | 7" : step === 2 ? "4 | 7" : "7 | 7"}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* --- NỘI DUNG TỪNG BƯỚC --- */}

                {/* === STEP 1: NHẬP TÊN NHÀ === */}
                {step === 1 && (
                    <Box sx={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", mt: -2, p: 3 }}>
                        <Paper elevation={3} sx={{
                            width: 300, height: 180, borderRadius: "16px", mb: 4, position: "relative",
                            backgroundImage: `url('https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
                            backgroundSize: "cover", backgroundPosition: "center"
                        }}>
                            <Box sx={{ position: "absolute", top: 12, right: 12, bgcolor: "#fff", borderRadius: "8px", width: 32, height: 32, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", boxShadow: 1 }}>
                                <PhotoCameraBackIcon sx={{ fontSize: 18, color: "#007BFF" }} />
                            </Box>
                        </Paper>
                        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2, color: "#2D3748" }}>What's your house name?</Typography>
                        <TextField
                            variant="outlined" value={houseName} onChange={(e) => setHouseName(e.target.value)} fullWidth
                            sx={{ maxWidth: 400, bgcolor: "#fff", mb: 4, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                        />
                        <Typography variant="body2" sx={{ color: "#718096", mb: 2 }}>No inspiration? Try one of these names.</Typography>
                        <Stack direction="row" spacing={2}>
                            {["Home", "Office", "My happy place"].map((name) => (
                                <Button key={name} variant="contained" onClick={() => setHouseName(name)} sx={{ bgcolor: "#E2E8F0", color: "#4A5568", textTransform: "none", boxShadow: "none", borderRadius: "8px", "&:hover": { bgcolor: "#CBD5E0" } }}>{name}</Button>
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* === STEP 2: CHỌN THIẾT BỊ === */}
                {step === 2 && (
                    <>
                        {/* Thẻ Info Nổi */}
                        <Box sx={{ px: 3, mt: -6, zIndex: 10 }}>
                            <Paper elevation={2} sx={{ p: 2, borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ width: 60, height: 60, borderRadius: "12px", backgroundImage: `url('https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80')`, backgroundSize: "cover" }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>{houseName} <EditIcon sx={{ fontSize: 16, ml: 1, color: "#007BFF" }} /></Typography>
                                        <Typography variant="caption" color="text.secondary">London, UK</Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Chip label="4 Rooms" size="small" sx={{ bgcolor: "#E6FFFA", color: "#38B2AC", fontWeight: 600 }} />
                                    <Chip label={`${devices.filter(d => d.connected).length} Devices`} size="small" sx={{ bgcolor: "#EBF8FF", color: "#4299E1", fontWeight: 600 }} />
                                </Stack>
                            </Paper>
                        </Box>

                        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">Link smart devices</Typography>
                                    <Typography variant="caption" color="text.secondary">Current devices nearby</Typography>
                                </Box>
                                <TextField placeholder="Search" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: "#A0AEC0" }} /></InputAdornment>) }} sx={{ bgcolor: "#fff", borderRadius: "8px", width: 250 }} />
                            </Stack>
                            <Grid container spacing={2}>
                                {filteredDevices.map((device) => (
                                    <Grid item xs={12} sm={6} md={4} key={device.id}>
                                        <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", border: device.connected ? "2px solid #007BFF" : "1px solid #E2E8F0", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", height: 160, justifyContent: "space-between" }}>
                                            <Box sx={{ mt: 2 }}><img src={device.image} alt={device.name} style={{ height: 60, opacity: device.connected ? 1 : 0.6 }} /></Box>
                                            <Box sx={{ width: "100%", textAlign: "left" }}>
                                                <Typography variant="subtitle2" fontWeight="bold">{device.name}</Typography>
                                                <Typography variant="caption" sx={{ color: device.connected ? "#38B2AC" : "#A0AEC0", display: "flex", alignItems: "center" }}>{device.connected ? <><CheckCircleIcon sx={{ fontSize: 12, mr: 0.5 }} /> connected</> : "not connected"}</Typography>
                                            </Box>
                                            <IconButton onClick={() => toggleDeviceConnection(device.id)} sx={{ position: "absolute", bottom: 12, right: 12, width: 36, height: 36, bgcolor: device.connected ? "#fff" : "#EBF8FF", color: device.connected ? "#E53E3E" : "#007BFF", border: device.connected ? "1px solid #E2E8F0" : "none" }}>{device.connected ? <DeleteOutlineIcon fontSize="small" /> : <AddIcon fontSize="small" />}</IconButton>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </>
                )}

                {/* === STEP 3: TỔNG KẾT (CONFIRM) === */}
                {step === 3 && (
                    <>
                        <Box sx={{ px: 3, mt: -6, zIndex: 10 }}>
                            <Paper elevation={2} sx={{ p: 2, borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ width: 60, height: 60, borderRadius: "12px", backgroundImage: `url('https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80')`, backgroundSize: "cover" }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>{houseName} <EditIcon sx={{ fontSize: 16, ml: 1, color: "#007BFF" }} /></Typography>
                                        <Typography variant="caption" color="text.secondary">London, UK</Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Chip label="4 Rooms" size="small" sx={{ bgcolor: "#E6FFFA", color: "#38B2AC", fontWeight: 600 }} />
                                    <Chip label={`${devices.filter(d => d.connected).length} Devices`} size="small" sx={{ bgcolor: "#EBF8FF", color: "#4299E1", fontWeight: 600 }} />
                                    <Chip label="2 Members" size="small" sx={{ bgcolor: "#FAF5FF", color: "#9F7AEA", fontWeight: 600 }} />
                                </Stack>
                            </Paper>
                        </Box>

                        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5, color: "#4A5568" }}>Your Rooms <Box component="span" sx={{ bgcolor: "#E2E8F0", px: 1, borderRadius: 1, fontSize: 12 }}>4</Box></Typography>
                                        <Paper elevation={0} sx={{ borderRadius: "16px", overflow: "hidden" }}>
                                            {ROOMS.map((room, index) => (
                                                <Box key={room.id} sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: index !== ROOMS.length - 1 ? "1px solid #F7FAFC" : "none" }}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <Avatar sx={{ bgcolor: room.color, color: room.iconColor }}>{room.icon}</Avatar>
                                                        <Box><Typography variant="body2" fontWeight="bold">{room.name}</Typography><Typography variant="caption" color="text.secondary">{room.size}</Typography></Box>
                                                    </Stack>
                                                    <IconButton size="small"><MoreHorizIcon sx={{ color: "#A0AEC0" }} /></IconButton>
                                                </Box>
                                            ))}
                                        </Paper>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5, color: "#4A5568" }}>Your Members <Box component="span" sx={{ bgcolor: "#E2E8F0", px: 1, borderRadius: 1, fontSize: 12 }}>2</Box></Typography>
                                        <Grid container spacing={2}>
                                            {MEMBERS.map((member) => (
                                                <Grid item xs={12} key={member.id}>
                                                    <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <Stack direction="row" spacing={2} alignItems="center"><Avatar src={member.avatar} /><Box><Typography variant="body2" fontWeight="bold">{member.name}</Typography><Typography variant="caption" color="text.secondary">{member.email}</Typography></Box></Stack>
                                                        <IconButton size="small"><DeleteOutlineIcon fontSize="small" sx={{ color: "#CBD5E0" }} /></IconButton>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5, color: "#4A5568" }}>Your Devices <Box component="span" sx={{ bgcolor: "#E2E8F0", px: 1, borderRadius: 1, fontSize: 12 }}>{devices.filter(d => d.connected).length}</Box></Typography>
                                    <Stack spacing={2}>
                                        {devices.filter(d => d.connected).map((device) => (
                                            <Paper key={device.id} elevation={0} sx={{ p: 2, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Box sx={{ width: 48, height: 48, display: "flex", justifyContent: "center", alignItems: "center" }}><img src={device.image} alt={device.name} style={{ maxWidth: "100%", maxHeight: "100%" }} /></Box>
                                                    <Box><Typography variant="body2" fontWeight="bold">{device.name}</Typography><Typography variant="caption" color="text.secondary">Living Room</Typography></Box>
                                                </Stack>
                                                <IconButton size="small"><DeleteOutlineIcon fontSize="small" sx={{ color: "#CBD5E0" }} /></IconButton>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}

                {/* FOOTER CHUNG */}
                <Paper elevation={3} sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0" }}>
                    <Typography variant="caption" color="text.secondary">
                        {step === 3 ? "Check all the information and start with your new space." : "Add all your details and go to the next step."}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={step === 3 ? () => navigate("/dashboard") : handleNext}
                        sx={{
                            bgcolor: "#007BFF", color: "#fff", borderRadius: "12px", px: 6, py: 1.5,
                            textTransform: "none", fontWeight: 600, boxShadow: "none",
                            "&:hover": { bgcolor: "#0069D9", boxShadow: "none" }
                        }}
                    >
                        {step === 3 ? "Done" : "Continue"}
                    </Button>
                </Paper>

            </Box>
        </MainLayout>
    );
};

export default EmptySpace;
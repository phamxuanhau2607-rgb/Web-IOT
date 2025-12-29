import React from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Stack,
    Paper,
    Grid,
    Avatar,
    Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChairIcon from '@mui/icons-material/Chair'; // Icon đại diện phòng khách
import KitchenIcon from '@mui/icons-material/Kitchen'; // Icon bếp
import BedIcon from '@mui/icons-material/Bed'; // Icon ngủ
import BathtubIcon from '@mui/icons-material/Bathtub'; // Icon tắm
import MainLayout from "../components/MainLayout";

// --- MOCK DATA ---
const ROOMS = [
    { id: 1, name: "Living Room", size: "20 m²", icon: <ChairIcon />, color: "#E6FFFA", iconColor: "#38B2AC" },
    { id: 2, name: "Kitchen", size: "12 m²", icon: <KitchenIcon />, color: "#FFFAF0", iconColor: "#DD6B20" },
    { id: 3, name: "Bedroom", size: "16 m²", icon: <BedIcon />, color: "#F7FAFC", iconColor: "#718096" },
    { id: 4, name: "Bathroom", size: "6 m²", icon: <BathtubIcon />, color: "#FFF5F5", iconColor: "#E53E3E" },
];

const DEVICES = [
    { id: 1, name: "Smart Lamp", room: "Living Room", image: "https://cdn-icons-png.flaticon.com/512/2983/2983965.png" },
    { id: 2, name: "Speaker", room: "Living Room", image: "https://cdn-icons-png.flaticon.com/512/3050/3050212.png" },
    { id: 3, name: "Humidifier", room: "Living Room", image: "https://cdn-icons-png.flaticon.com/512/3233/3233663.png" },
];

const MEMBERS = [
    { id: 1, name: "Albert Flores", email: "albert.flores@gmail.com", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: 2, name: "Annette Black", email: "annette.black@gmail.com", avatar: "https://i.pravatar.cc/150?img=5" },
];

const CreateSpaceStep7 = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Box sx={{
                height: "calc(100vh - 64px)",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#F7FAFC"
            }}>

                {/* --- 1. HEADER --- */}
                <Box sx={{
                    bgcolor: "#1A202C",
                    color: "#fff",
                    p: 3,
                    pb: 10,
                    position: "relative"
                }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <IconButton onClick={() => navigate(-1)} sx={{ color: "rgba(255,255,255,0.7)" }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6" fontWeight="bold">Create a new space</Typography>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                                Confirm your choices
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>Step</Typography>
                            <Typography variant="subtitle2" fontWeight="bold">7 | 7</Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* --- 2. FLOATING INFO CARD --- */}
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

                        <Stack direction="row" spacing={1}>
                            <Chip label="4 Rooms" size="small" sx={{ bgcolor: "#E6FFFA", color: "#38B2AC", fontWeight: 600 }} />
                            <Chip label="3 Devices" size="small" sx={{ bgcolor: "#EBF8FF", color: "#4299E1", fontWeight: 600 }} />
                            <Chip label="2 Members" size="small" sx={{ bgcolor: "#FAF5FF", color: "#9F7AEA", fontWeight: 600 }} />
                        </Stack>
                    </Paper>
                </Box>

                {/* --- 3. MAIN CONTENT (Scrollable Grid) --- */}
                <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
                    <Grid container spacing={3}>

                        {/* COLUMN 1: ROOMS & MEMBERS */}
                        <Grid item xs={12} md={6}>
                            {/* Rooms Section */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5, color: "#4A5568" }}>
                                    Your Rooms <Box component="span" sx={{ bgcolor: "#E2E8F0", px: 1, borderRadius: 1, fontSize: 12 }}>3</Box>
                                </Typography>
                                <Paper elevation={0} sx={{ borderRadius: "16px", overflow: "hidden" }}>
                                    {ROOMS.map((room, index) => (
                                        <Box key={room.id} sx={{
                                            p: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            borderBottom: index !== ROOMS.length - 1 ? "1px solid #F7FAFC" : "none"
                                        }}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar sx={{ bgcolor: room.color, color: room.iconColor }}>{room.icon}</Avatar>
                                                <Box>
                                                    <Typography variant="body2" fontWeight="bold">{room.name}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{room.size}</Typography>
                                                </Box>
                                            </Stack>
                                            <IconButton size="small"><MoreHorizIcon sx={{ color: "#A0AEC0" }} /></IconButton>
                                        </Box>
                                    ))}
                                </Paper>
                            </Box>

                            {/* Members Section */}
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5, color: "#4A5568" }}>
                                    Your Members <Box component="span" sx={{ bgcolor: "#E2E8F0", px: 1, borderRadius: 1, fontSize: 12 }}>2</Box>
                                </Typography>
                                <Grid container spacing={2}>
                                    {MEMBERS.map((member) => (
                                        <Grid item xs={12} key={member.id}>
                                            <Paper elevation={0} sx={{ p: 2, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Avatar src={member.avatar} />
                                                    <Box>
                                                        <Typography variant="body2" fontWeight="bold">{member.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary">{member.email}</Typography>
                                                    </Box>
                                                </Stack>
                                                <IconButton size="small"><DeleteOutlineIcon fontSize="small" sx={{ color: "#CBD5E0" }} /></IconButton>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>

                        {/* COLUMN 2: DEVICES */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5, color: "#4A5568" }}>
                                Your Devices <Box component="span" sx={{ bgcolor: "#E2E8F0", px: 1, borderRadius: 1, fontSize: 12 }}>3</Box>
                            </Typography>
                            <Stack spacing={2}>
                                {DEVICES.map((device) => (
                                    <Paper key={device.id} elevation={0} sx={{ p: 2, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Box sx={{ width: 48, height: 48, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img src={device.image} alt={device.name} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" fontWeight="bold">{device.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{device.room}</Typography>
                                            </Box>
                                        </Stack>
                                        <IconButton size="small"><DeleteOutlineIcon fontSize="small" sx={{ color: "#CBD5E0" }} /></IconButton>
                                    </Paper>
                                ))}
                            </Stack>
                        </Grid>

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
                        Check all the information and start with your new space.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/dashboard")} // Hoàn tất thì về Dashboard
                        sx={{
                            bgcolor: "#007BFF",
                            color: "#fff",
                            borderRadius: "12px",
                            px: 6,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: "none",
                            "&:hover": { bgcolor: "#0069D9", boxShadow: "none" }
                        }}
                    >
                        Done
                    </Button>
                </Paper>

            </Box>
        </MainLayout>
    );
};

export default CreateSpaceStep7;
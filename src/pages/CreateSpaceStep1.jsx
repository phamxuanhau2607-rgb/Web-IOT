import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    Stack,
    Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack'; // Icon thay thế cho upload
import MainLayout from "../components/MainLayout"; // Giữ nguyên layout của bạn
import houseImage from "../assets/icon/ChucNangWeb/image (2).png"; // Dùng tạm ảnh bạn đang có hoặc thay ảnh nhà mẫu

const CreateSpaceStep1 = () => {
    const navigate = useNavigate();
    const [houseName, setHouseName] = useState("My Home");

    // Các tên gợi ý
    const suggestions = ["Home", "Office", "My happy place"];

    return (
        <MainLayout>
            <Box sx={{
                height: "calc(100vh - 64px)", // Trừ đi chiều cao header của MainLayout nếu có
                display: "flex",
                flexDirection: "column",
                bgcolor: "#F7FAFC" // Màu nền sáng nhẹ cho tổng thể
            }}>

                {/* --- 1. HEADER SECTION --- */}
                <Box sx={{
                    bgcolor: "#1A202C", // Màu xanh đậm giống thiết kế
                    color: "#fff",
                    p: 4,
                    pb: 8, // Padding bottom lớn để tạo không gian cho phần nội dung đè lên (nếu cần) hoặc tạo thoáng
                    position: "relative"
                }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <IconButton onClick={() => navigate(-1)} sx={{ color: "rgba(255,255,255,0.7)" }}>
                            <ArrowBackIcon />
                        </IconButton>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h5" fontWeight="bold">Create a new space</Typography>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                                Add the first details
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: "right" }}>
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>Step</Typography>
                            <Typography variant="h6" fontWeight="bold">1 | 7</Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* --- 2. MAIN CONTENT (Scrollable) --- */}
                <Box sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: -4, // Đẩy nội dung lên đè một chút vào Header nếu muốn, hoặc để 0
                    p: 3
                }}>

                    {/* Card chứa ảnh */}
                    <Box sx={{ position: "relative", mb: 4 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                width: 300,
                                height: 180,
                                borderRadius: "16px",
                                overflow: "hidden",
                                backgroundImage: `url('https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`, // Ảnh mẫu nhà hiện đại
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        />
                        {/* Nút Upload icon ở góc ảnh */}
                        <Box sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            bgcolor: "#fff",
                            borderRadius: "8px",
                            width: 32,
                            height: 32,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow: 1
                        }}>
                            <PhotoCameraBackIcon sx={{ fontSize: 18, color: "#007BFF" }} />
                        </Box>
                    </Box>

                    {/* Form nhập tên */}
                    <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2, color: "#2D3748" }}>
                        What's your house name?
                    </Typography>

                    <TextField
                        variant="outlined"
                        value={houseName}
                        onChange={(e) => setHouseName(e.target.value)}
                        fullWidth
                        sx={{
                            maxWidth: 400,
                            bgcolor: "#fff",
                            mb: 4,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                            }
                        }}
                    />

                    {/* Gợi ý tên */}
                    <Typography variant="body2" sx={{ color: "#718096", mb: 2 }}>
                        No inspiration? Try one of these names.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        {suggestions.map((name) => (
                            <Button
                                key={name}
                                variant="contained"
                                onClick={() => setHouseName(name)}
                                sx={{
                                    bgcolor: "#E2E8F0",
                                    color: "#4A5568",
                                    textTransform: "none",
                                    boxShadow: "none",
                                    borderRadius: "8px",
                                    "&:hover": { bgcolor: "#CBD5E0", boxShadow: "none" }
                                }}
                            >
                                {name}
                            </Button>
                        ))}
                    </Stack>
                </Box>

                {/* --- 3. FOOTER BAR --- */}
                <Paper elevation={3} sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #E2E8F0"
                }}>
                    <TextField
                        placeholder="Name your new space"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        disabled
                        sx={{ visibility: "hidden" }} // Placeholder để cân bằng layout
                    />

                    <Button
                        variant="contained"
                        onClick={() => navigate("/create-space/step-2")} // Đường dẫn giả định cho bước tiếp theo
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
                        Continue
                    </Button>
                </Paper>

            </Box>
        </MainLayout>
    );
};

export default CreateSpaceStep1;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, InputAdornment, IconButton, List, ListItem, ListItemIcon, ListItemText, Grid, LinearProgress } from '@mui/material';
import { Eye, EyeOff, Check, Circle } from 'lucide-react'; // Dùng Circle làm dấu chấm tròn
import securityIcon from '../assets/icon/Dangnhap/3_pixian_ai.png';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // --- LOGIC KIỂM TRA MỚI (Theo ảnh mẫu) ---
    const hasMinLength = formData.password.length >= 8;
    // Số (0-9) HOẶC Ký tự đặc biệt
    const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    // Chữ thường (a-z) VÀ Chữ hoa (A-Z)
    const hasUpperAndLower = /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password);

    // Tính điểm độ mạnh mật khẩu (0 - 3)
    const strengthScore = [hasMinLength, hasNumberOrSymbol, hasUpperAndLower].filter(Boolean).length;

    // Màu sắc thanh tiến trình dựa trên điểm số
    const getStrengthColor = () => {
        if (strengthScore === 0) return '#E2E8F0'; // Xám
        if (strengthScore === 1) return '#E53E3E'; // Đỏ (Yếu)
        if (strengthScore === 2) return '#ECC94B'; // Vàng (Trung bình - Giống ảnh mẫu)
        return '#38A169'; // Xanh (Mạnh)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (strengthScore === 3 && formData.password === formData.confirmPassword) {
            navigate('/hello');
        }
    };

    // Component hiển thị dòng điều kiện
    const RequirementItem = ({ fulfilled, text }) => (
        <ListItem disablePadding sx={{ py: 0.3 }}>
            <ListItemIcon sx={{ minWidth: 24 }}>
                {fulfilled ? (
                    <Check size={16} color="#38A169" /> // Tích xanh
                ) : (
                    <Circle size={8} fill="#A0AEC0" color="#A0AEC0" /> // Chấm tròn xám
                )}
            </ListItemIcon>
            <ListItemText
                primary={text}
                primaryTypographyProps={{
                    variant: 'caption',
                    color: fulfilled ? '#38A169' : '#A0AEC0', // Đạt thì xanh, chưa thì xám
                    fontWeight: 500,
                    fontSize: '13px'
                }}
            />
        </ListItem>
    );

    return (
        <Grid container sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {/* --- CỘT TRÁI: GIỮ NGUYÊN (9 PHẦN) --- */}
            <Grid item xs={12} md={9} sx={{
                bgcolor: '#F3F4F6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 4,
                position: 'relative'
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    mt: 2
                }}>
                    <img
                        src={securityIcon}
                        alt="Reset Password"
                        style={{
                            width: 'auto',
                            maxWidth: '100%',
                            maxHeight: '60vh',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.1))',
                            transform: 'scale(1.35)',
                        }}
                    />
                </Box>
                {/* Footer Text */}
                <Box sx={{ textAlign: 'center', zIndex: 1, mb: 4, width: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#2D3748', mb: 1, lineHeight: 1.2, fontSize: { xs: '24px', lg: '36px' } }}>
                        Easy living with your<br />smart home 💡
                    </Typography>
                    <Typography sx={{ color: '#718096', maxWidth: '450px', mx: 'auto', fontSize: '15px', lineHeight: 1.5, mb: 3 }}>
                        Get your smart devices in one place and manage all of these with a few taps.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3182CE' }} />
                    </Box>
                </Box>
            </Grid>

            {/* --- CỘT PHẢI: FORM CHUẨN ẢNH MẪU (3 PHẦN) --- */}
            <Grid item xs={12} md={3} sx={{
                bgcolor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                px: { xs: 3, md: 3 }
            }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>

                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, color: '#1A202C', textAlign: 'center' }}>
                        Reset password
                    </Typography>

                    {/* Ô nhập mật khẩu mới */}
                    <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        placeholder="..............." // Placeholder giống ảnh
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                        {showPassword ? <EyeOff size={18} color="#CBD5E0" /> : <Eye size={18} color="#CBD5E0" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '10px', height: '45px', fontSize: '14px', bgcolor: '#F7FAFC' }
                        }}
                        // Xóa viền dưới mặc định để thanh progress bar nhìn liền mạch hơn
                        sx={{ mb: 0 }}
                    />

                    {/* THANH ĐO ĐỘ MẠNH (Strength Meter) */}
                    <Box sx={{ width: '100%', mb: 2, mt: 0.5 }}>
                        <LinearProgress
                            variant="determinate"
                            value={(strengthScore / 3) * 100}
                            sx={{
                                height: 4,
                                borderRadius: 2,
                                bgcolor: '#EDF2F7', // Màu nền xám nhạt
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: getStrengthColor(), // Màu thay đổi theo độ mạnh
                                    transition: 'background-color 0.3s'
                                }
                            }}
                        />
                    </Box>

                    {/* DANH SÁCH ĐIỀU KIỆN (Checklist) */}
                    <List dense sx={{ mb: 3, pl: 1 }}>
                        <RequirementItem fulfilled={hasMinLength} text="Least 8 characters" />
                        <RequirementItem fulfilled={hasNumberOrSymbol} text="Least one number (0-9) or symbol" />
                        <RequirementItem fulfilled={hasUpperAndLower} text="Lowercase (a-z) and uppercase (A-Z)" />
                    </List>

                    {/* Ô nhập lại mật khẩu */}
                    <TextField
                        fullWidth
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                                        {showConfirmPassword ? <EyeOff size={18} color="#CBD5E0" /> : <Eye size={18} color="#CBD5E0" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '10px', height: '45px', fontSize: '14px', bgcolor: '#F7FAFC' }
                        }}
                        sx={{ mb: 4 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            py: 1.2,
                            bgcolor: '#3182CE',
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '15px',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#2B6CB0', boxShadow: 'none' }
                        }}
                    >
                        Submitting
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, TextField, InputAdornment, Grid } from '@mui/material';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import houseIcon from '../assets/icon/Dangnhap/3_pixian_ai.png';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setEmailSent(true);
            setTimeout(() => navigate('/verify-code'), 3000);
        }
    };

    return (
        <Grid container sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {/* --- CỘT TRÁI: HÌNH ẢNH (GIỮ NGUYÊN) --- */}
            <Grid item xs={12} md={8} sx={{
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
                        src={houseIcon}
                        alt="Smart Home Forgot Password"
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

                <Box sx={{ textAlign: 'center', zIndex: 1, mb: 4, width: '100%' }}>
                    <Typography variant="h3" sx={{
                        fontWeight: 800,
                        color: '#2D3748',
                        mb: 1,
                        lineHeight: 1.2,
                        fontSize: { xs: '24px', lg: '36px' }
                    }}>
                        Easy living with your<br />
                        smart home 💡
                    </Typography>

                    <Typography sx={{
                        color: '#718096',
                        maxWidth: '450px',
                        mx: 'auto',
                        fontSize: '15px',
                        lineHeight: 1.5,
                        mb: 3
                    }}>
                        Get your smart devices in one place and manage all of these with a few taps.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3182CE' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                    </Box>
                </Box>
            </Grid>

            {/* --- CỘT PHẢI: FORM (ĐÃ ĐIỀU CHỈNH SANG PHẢI) --- */}
            <Grid item xs={12} md={4} sx={{
                bgcolor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',

                // THAY ĐỔI 1: Căn toàn bộ nội dung sang bên phải
                alignItems: 'flex-end',

                height: '100%',

                // THAY ĐỔI 2: Điều chỉnh khoảng cách
                // pr (Padding Right): Tạo khoảng cách vừa đủ với mép phải màn hình
                // pl (Padding Left): Giảm đi vì không cần căn giữa nữa
                pr: { xs: 3, md: 8, lg: 12 },
                pl: { xs: 3, md: 2 }
            }}>
                {/* Box chứa form vẫn giữ maxWidth để form gọn gàng */}
                <Box sx={{ width: '100%', maxWidth: '450px' }}>

                    {!emailSent ? (
                        <Box component="form" onSubmit={handleSubmit}>
                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: '#1A202C', textAlign: 'center' }}>
                                Forgot password?
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, color: '#718096', textAlign: 'center' }}>
                                No worries, we'll send you reset instructions.
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail size={20} color="#A0AEC0" />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: '12px', height: '48px' }
                                }}
                                sx={{ mb: 3 }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    py: 1.5,
                                    bgcolor: '#3182CE',
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    boxShadow: 'none',
                                    '&:hover': { bgcolor: '#2B6CB0', boxShadow: 'none' },
                                    mb: 3
                                }}
                            >
                                Reset password
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: 'none',
                                        color: '#718096',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        fontWeight: 500
                                    }}
                                >
                                    <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back to log in
                                </Link>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
                            <Box sx={{
                                width: 80,
                                height: 80,
                                bgcolor: '#F0FFF4',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3
                            }}>
                                <CheckCircle size={40} color="#38A169" />
                            </Box>
                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: '#1A202C' }}>
                                Check your email
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#718096', lineHeight: 1.6, mb: 4 }}>
                                We sent a password reset link to<br />
                                <Box component="span" fontWeight="bold" color="#2D3748">{email}</Box>
                            </Typography>

                            <Button
                                onClick={() => navigate('/login')}
                                variant="outlined"
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    borderColor: '#E2E8F0',
                                    color: '#718096'
                                }}
                            >
                                Back to log in
                            </Button>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;
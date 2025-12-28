import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, Checkbox, FormControlLabel, Divider, IconButton, InputAdornment, TextField, Grid } from '@mui/material';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import houseIcon from '../assets/icon/Dangnhap/2_pixian_ai.png';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            navigate('/verify-code');
        }
    };

    return (
        <Grid container sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {/* --- CỘT TRÁI: HÌNH ẢNH (CHIẾM 8 PHẦN - 66%) --- */}
            {/* Tăng từ md={6} lên md={8} để cột này rộng ra, đẩy form sát về bên phải */}
            <Grid item xs={12} md={8} sx={{
                bgcolor: '#F3F4F6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 4,
                position: 'relative'
            }}>
                {/* Phần chứa ảnh */}
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
                        alt="Smart Home Login"
                        style={{
                            width: 'auto',
                            maxWidth: '500%',
                            maxHeight: '65vh', // Giữ chiều cao ổn định
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.1))',
                        }}
                    />
                </Box>

                {/* Phần Chữ */}
                <Box sx={{
                    textAlign: 'center',
                    zIndex: 1,
                    mb: 4,
                    width: '100%'
                }}>
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
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3182CE' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                    </Box>
                </Box>
            </Grid>

            {/* --- CỘT PHẢI: FORM LOGIN (CHIẾM 4 PHẦN - 33%) --- */}
            {/* Giảm từ md={6} xuống md={4} để form nằm gọn gàng, không còn đất trống */}
            <Grid item xs={12} md={4} sx={{
                bgcolor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', // Căn giữa trong cột nhỏ sẽ tự động nhìn cân đối
                height: '100%',
                // Padding vừa phải để không bị dính sát mép màn hình
                px: { xs: 3, md: 4, lg: 5 }
            }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '450px' }}>

                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: '#1A202C', textAlign: 'center' }}>
                        Login
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: '#718096', textAlign: 'center' }}>
                        Welcome back! Please enter your details.
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="@gmail.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail size={20} color="#A0AEC0" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '12px', height: '48px' }
                        }}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock size={20} color="#A0AEC0" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '12px', height: '48px' }
                        }}
                        sx={{ mb: 1.5 }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    sx={{ color: '#CBD5E0', '&.Mui-checked': { color: '#3182CE' } }}
                                />
                            }
                            label={<Typography variant="body2" color="#718096">Remember information</Typography>}
                        />
                    </Box>

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
                            mb: 2
                        }}
                    >
                        Login
                    </Button>

                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#3182CE', fontSize: '14px', fontWeight: 600 }}>
                            Forgot password?
                        </Link>
                    </Box>

                    <Divider sx={{ mb: 3, color: '#A0AEC0', fontSize: '14px' }}>or</Divider>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FcGoogle size={22} />}
                            sx={{
                                py: 1,
                                borderColor: '#E2E8F0',
                                color: '#2D3748',
                                textTransform: 'none',
                                borderRadius: '12px',
                                fontWeight: 500,
                                '&:hover': { bgcolor: '#F7FAFC', borderColor: '#CBD5E0' }
                            }}
                        >
                            Login with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FaFacebook size={22} color="#1877F2" />}
                            sx={{
                                py: 1,
                                borderColor: '#E2E8F0',
                                color: '#2D3748',
                                textTransform: 'none',
                                borderRadius: '12px',
                                fontWeight: 500,
                                '&:hover': { bgcolor: '#F7FAFC', borderColor: '#CBD5E0' }
                            }}
                        >
                            Login with Facebook
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FaApple size={22} color="#000" />}
                            sx={{
                                py: 1,
                                borderColor: '#E2E8F0',
                                color: '#2D3748',
                                textTransform: 'none',
                                borderRadius: '12px',
                                fontWeight: 500,
                                '&:hover': { bgcolor: '#F7FAFC', borderColor: '#CBD5E0' }
                            }}
                        >
                            Login with Apple
                        </Button>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="#718096">
                            First time here?{' '}
                            <Link to="/register" style={{ textDecoration: 'none', color: '#3182CE', fontWeight: 600 }}>
                                Sign up for free
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
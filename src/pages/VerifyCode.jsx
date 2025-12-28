import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Link, Grid } from '@mui/material';
import otpIcon from '../assets/icon/Dangnhap/4_pixian_ai.png';

const VerifyCode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value !== '' && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullCode = code.join('');
        if (fullCode.length === 4) {
            navigate('/reset-password');
        }
    };

    return (
        <Grid container sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {/* --- CỘT TRÁI: HÌNH ẢNH (9 PHẦN) --- */}
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
                        src={otpIcon}
                        alt="Security Check"
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
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#CBD5E0' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3182CE' }} />
                    </Box>
                </Box>
            </Grid>

            {/* --- CỘT PHẢI: FORM OTP (3 PHẦN) --- */}
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

                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color: '#1A202C', textAlign: 'center' }}>
                        Verify Code
                    </Typography>

                    {/* --- CẬP NHẬT VĂN BẢN MỚI TẠI ĐÂY --- */}
                    <Typography variant="body2" sx={{
                        mb: 4,
                        color: '#718096',
                        textAlign: 'center',
                        fontSize: '14px',
                        lineHeight: 1.6,
                        maxWidth: '320px', // Giới hạn chiều rộng để chữ xuống dòng đẹp như ảnh mẫu
                        mx: 'auto'
                    }}>
                        We just sent a 4-digit verification code to<br />
                        <Box component="span" fontWeight="bold" color="#2D3748">phamxuanhau2607@gmail.com</Box>. Enter the code in the box below to continue.
                    </Typography>

                    {/* Ô NHẬP OTP */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 4 }}>
                        {code.map((digit, index) => (
                            <TextField
                                key={index}
                                id={`otp-${index}`}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                inputProps={{
                                    maxLength: 1,
                                    style: {
                                        textAlign: 'center',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        padding: 0
                                    }
                                }}
                                sx={{
                                    width: 50,
                                    height: 50,
                                    '& .MuiOutlinedInput-root': {
                                        height: '100%',
                                        borderRadius: '12px',
                                        bgcolor: '#F7FAFC',
                                        '& fieldset': { borderColor: '#E2E8F0' },
                                        '&.Mui-focused fieldset': { borderColor: '#3182CE', borderWidth: 2 }
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <Typography variant="body2" sx={{ mb: 4, textAlign: 'center', color: '#718096', fontSize: '13px' }}>
                        Don't receive code?{' '}
                        <Link
                            component="button"
                            type="button"
                            onClick={() => setTimeLeft(30)}
                            disabled={timeLeft > 0}
                            sx={{
                                color: timeLeft > 0 ? '#A0AEC0' : '#3182CE',
                                fontWeight: 600,
                                textDecoration: 'none',
                                cursor: timeLeft > 0 ? 'default' : 'pointer'
                            }}
                        >
                            Re-send {timeLeft > 0 && `(${timeLeft}s)`}
                        </Link>
                    </Typography>

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
                        Verify
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default VerifyCode;
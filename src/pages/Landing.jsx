import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import houseIcon from '../assets/icon/Dangnhap/1_pixian_ai.png';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            {/* 1. LAYER NỀN XÁM (Cái bục) */}
            <Box sx={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0,
                width: { xs: '100%', md: '80%' }, // Mở rộng nền xám ra chút
                bgcolor: '#E8EAED',
                zIndex: 0,
                // --- CHỈNH ĐỘ DỐC Ở ĐÂY (Số đầu tiên: 25%) ---
                // Tăng số này (ví dụ 40%) -> Đường chéo nằm ngang hơn
                // Giảm số này (ví dụ 10%) -> Đường chéo dốc đứng hơn
                clipPath: 'polygon(14% 0%, 150% 0%, 100% 100%, 80% 105%)',
            }} />

            <Box sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '1400px', // Cho phép khung chứa rộng tối đa
                height: '100%',
                display: 'flex',
                zIndex: 1
            }}>

                {/* Phần CHỮ */}
                <Box sx={{
                    flex: 1, // Tăng flex lên để khung chữ rộng hơn, giúp từ 'your' không bị rớt dòng
                    display: 'flex',
                    flexDirection: 'column',

                    // 1. DỊCH XUỐNG GỐC TRÁI:
                    // 'flex-end' sẽ đẩy nội dung xuống đáy container
                    justifyContent: 'flex-end',

                    // 2. CĂN CHỈNH VỊ TRÍ:
                    // pb (Padding Bottom): Đẩy cách đáy lên một khoảng (12 đơn vị ~ 96px)
                    // pl (Padding Left): Đẩy cách lề trái ra một khoảng (8 đơn vị ~ 64px)
                    pb: { xs: 5, md: 12 },
                    pl: { xs: 4, md: 2 },

                    zIndex: 2,
                }}>
                    <Typography component="h1" sx={{
                        fontFamily: '"Google Sans", "Roboto", sans-serif',

                        // 3. CHỮ NHỎ LẠI:
                        // Giảm từ 56px xuống 48px (trên PC) để dòng chữ dài ra, đủ chỗ cho từ 'your'
                        fontSize: { xs: '32px', md: '45px', lg: '48px' },
                        fontWeight: 700,
                        color: '#202124',
                        lineHeight: 1.25,
                        mb: 3, // Khoảng cách với dòng mô tả bên dưới
                    }}>
                        {/* Đặt thẻ br ngay sau chữ 'your' để ngắt dòng đúng ý bạn */}
                        Easy living with your<br />
                        smart home 💡
                    </Typography>

                    <Typography sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: { xs: '15px', md: '16px' }, // Chữ mô tả cũng nhỏ lại xíu cho cân đối
                        color: '#5F6368',
                        lineHeight: 1.6,
                        maxWidth: '400px', // Giới hạn chiều rộng để dòng mô tả ngắt đẹp
                        fontWeight: 400
                    }}>
                        Get your smart devices in one place and manage all of these with a few taps.
                    </Typography>
                </Box>

                {/* Phần ẢNH NGÔI NHÀ (Siêu to khổng lồ) */}
                <Box sx={{
                    flex: 1.5, // Dành phần lớn không gian cho ảnh
                    position: 'relative',
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src={houseIcon}
                        alt="Smart Home"
                        onClick={() => navigate('/login')}
                        style={{
                            // --- CHỈNH KÍCH THƯỚC Ở ĐÂY ---
                            width: '150%',       // Phóng to 150% chiều rộng khung chứa
                            maxWidth: '1300px',  // Giới hạn tối đa cực lớn

                            // --- CĂN CHỈNH VỊ TRÍ ĐỂ KHỚP VẠCH ---
                            marginLeft: '-20%',  // Kéo sang trái (số âm càng lớn càng sang trái)
                            marginTop: '2%',     // Đẩy xuống dưới (số dương càng lớn càng xuống)

                            height: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(-30px 30px 40px rgba(0,0,0,0.2))',
                            cursor: 'pointer',
                            transition: 'transform 0.3s'
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Landing;
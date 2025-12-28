import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { LampFloor, Speaker, Disc } from 'lucide-react'; // Import icon tượng trưng
import userAvatar from '../assets/icon/Dangnhap/5_pixian_ai.png';

const Hello = () => {
  const navigate = useNavigate();

  // Component con để tạo các Icon vệ tinh (Lamp, Speaker, etc.)
  const FloatingIcon = ({ icon: Icon, top, left, right, bottom }) => (
    <Box sx={{
      position: 'absolute',
      top, left, right, bottom,
      width: 50,
      height: 50,
      bgcolor: 'white',
      borderRadius: '50%',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    }}>
      <Icon size={24} color="#718096" />
    </Box>
  );

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      bgcolor: '#FFFFFF', // Nền trắng toàn màn hình
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden' // Ngăn thanh cuộn nếu các vòng tròn quá to
    }}>

      {/* --- PHẦN TRUNG TÂM: AVATAR & CÁC VÒNG TRÒN --- */}
      <Box sx={{
        position: 'relative',
        width: 400,
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2
      }}>

        {/* Vòng tròn 1 (Nhỏ nhất) */}
        <Box sx={{
          position: 'absolute',
          width: '65%',
          height: '65%',
          borderRadius: '50%',
          border: '1px solid #EDF2F7', // Màu viền xám rất nhạt
        }} />

        {/* Vòng tròn 2 (Vừa) */}
        <Box sx={{
          position: 'absolute',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          border: '1px solid #EDF2F7',
        }} />

        {/* Vòng tròn 3 (Lớn nhất) */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '1px solid #EDF2F7',
        }} />

        {/* AVATAR Ở CHÍNH GIỮA */}
        <Avatar
          src={userAvatar}
          alt="User Avatar"
          sx={{
            width: 140, // Avatar to hơn
            height: 140,
            zIndex: 10,
            border: '5px solid #fff', // Viền trắng dày bao quanh avatar
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        />

        {/* CÁC ICON VỆ TINH (Căn chỉnh vị trí thủ công để khớp ảnh mẫu) */}
        {/* 1. Cái đèn (Góc trên trái) */}
        <FloatingIcon icon={LampFloor} top="15%" left="15%" />

        {/* 2. Cái Loa (Góc trên phải - thấp hơn xíu) */}
        <FloatingIcon icon={Speaker} top="25%" right="10%" />

        {/* 3. Robot hút bụi (Góc dưới phải) */}
        <FloatingIcon icon={Disc} bottom="20%" right="20%" />

      </Box>

      {/* --- PHẦN CHỮ & NÚT --- */}
      <Box sx={{ textAlign: 'center', zIndex: 10, mt: 2 }}>
        <Typography variant="h4" fontWeight="800" sx={{ color: '#2D3748', mb: 1 }}>
          Hello, Kristin!
        </Typography>

        <Typography variant="body1" sx={{ color: '#718096', mb: 6 }}>
          Good morning, welcome back.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{
            width: 300, // Nút rộng nhưng không full màn hình
            py: 1.8,
            bgcolor: '#3182CE',
            borderRadius: 3, // Bo tròn nhiều hơn
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            boxShadow: '0 4px 14px 0 rgba(49, 130, 206, 0.39)', // Bóng đổ xanh nhẹ cho nút
            '&:hover': { bgcolor: '#2B6CB0' }
          }}
        >
          Get started
        </Button>
      </Box>

    </Box>
  );
};

export default Hello;
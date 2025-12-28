import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F7FA' }}>
            <CssBaseline />

            {/* Sidebar cố định bên trái */}
            <Sidebar />

            {/* Nội dung chính bên phải */}
            <Box component="main" sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - 280px)` } }}>
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
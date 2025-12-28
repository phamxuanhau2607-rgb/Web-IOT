import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useHome } from '../contexts/HomeContext';
import { Bolt, TrendingDown } from '@mui/icons-material';

const Statistics = () => {
    const { statistics } = useHome();

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Box sx={{ bgcolor: 'white', p: 1.5, border: '1px solid #E2E8F0', borderRadius: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <Typography variant="caption" sx={{ color: '#718096', fontWeight: 600 }}>{label}</Typography>
                    <Typography variant="body2" sx={{ color: '#4FD1C5', fontWeight: 'bold' }}>
                        {payload[0].value} KW
                    </Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#2D3748', mb: 4 }}>
                Energy Statistics
            </Typography>

            <Grid container spacing={4}>
                {/* Chart Section */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 4, height: 400 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#2D3748' }}>
                                Usage This Week
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                                KW / Day
                            </Typography>
                        </Box>

                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={statistics.weeklyUsage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A0AEC0', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A0AEC0', fontSize: 12 }}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="kw" radius={[6, 6, 6, 6]} barSize={40}>
                                    {statistics.weeklyUsage.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 5 ? '#4FD1C5' : '#CBD5E0'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Summary Cards */}
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: '#319795',
                            color: 'white',
                            mb: 3,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: -10, right: -10, width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                                <Typography variant="h3" fontWeight="bold">{statistics.totalLoss}</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Loss (KW)</Typography>
                            </Box>
                            <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                                <Bolt />
                            </Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 3, borderRadius: 4 }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                            <Box sx={{ p: 1, bgcolor: '#FFF5F5', borderRadius: '50%', color: '#E53E3E' }}>
                                <TrendingDown />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#2D3748' }}>Down 12%</Typography>
                                <Typography variant="caption" sx={{ color: '#A0AEC0' }}>compared to last week</Typography>
                            </Box>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#4A5568' }}>
                            Great job! You are using less energy than usual. Consider checking your AC scheduling to save even more.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;
